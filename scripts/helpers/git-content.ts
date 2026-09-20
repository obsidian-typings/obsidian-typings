/**
 * @file
 *
 * Reading a tracked file as it is about to be COMMITTED, rather than as it sits in the working tree.
 *
 * `check:vendored-eslint-rules` asserts something about the bytes of a file that is going to be committed,
 * and it runs from `nano-staged` alongside `lint:fix` and `format`, which rewrite staged files in place.
 * **nano-staged builds one task group per pattern and runs the groups with `Promise.all`**
 * (`node_modules/nano-staged/lib/cmd-runner.js:76`, measured against nano-staged 1.0.2 in this checkout,
 * 2026-09-19), so no arrangement of keys makes a gate follow the fixer: sequencing exists within a single
 * key's command list and nowhere else. A gate reading the working tree therefore races the fixer, and which
 * bytes it sees is a coin toss.
 *
 * Reading the index instead makes the ordering irrelevant rather than enforced. It also makes the gate
 * answer the question it is actually asked when a developer runs it by hand mid-edit: the subject is what
 * will be committed, not whatever the editor happens to be holding.
 *
 * On a clean checkout - CI, or a fresh clone - the index and the working tree hold the same bytes, so this
 * changes nothing there.
 *
 * ## Why this is its own module rather than a function in `git.ts`
 *
 * `helpers/git.ts` is the ignore-honoring file LISTING module, and its premise is that it asks git through
 * `execFromRoot` - which is exactly what this cannot do (below). The name is also taken twice over in this
 * repo and already means two unrelated things: `scripts/helpers/git.ts` lists files, while
 * `workflow-scripts/helpers/git.ts` commits, tags and reads branch names. A content read gets its own
 * unambiguous name rather than becoming a third meaning of that one.
 *
 * ## Why this does not go through `execFromRoot`
 *
 * Three reasons, measured against THIS repo's `helpers/exec.ts` - the fleet's largest copy of that helper -
 * and the first alone would be enough:
 *
 * - **It strips one trailing newline** (`exec.ts`, the `stdout` `end` handler). Every vendored rule source
 *   ends with one, so every one of them would read as differing from upstream by its last line. This is the
 *   live failure, not a hypothetical.
 * - **It decodes stdout as UTF-8** (the `stdout` `data` handler). This gate's roster is all `.ts` text
 *   today, so this is the latent one - but the function is a general index read, this repo tracks binary
 *   assets (`docs/assets/fonts/*.ttf`), and a round trip through a JavaScript string does not preserve
 *   their bytes.
 * - **It runs its command through a shell** (`spawnViaShell`), so the argument would be text a quoting layer
 *   gets to interpret. `:./<path>` opens with a git revision sigil, which is not a character to hand to a
 *   shell when nothing needs one.
 *
 * So this spawns `git` directly and concatenates Buffers.
 */

import { Buffer } from 'node:buffer';
import { spawn } from 'node:child_process';

/**
 * Reads one tracked file's content out of the git index - stage 0, the bytes `git commit` would write.
 *
 * The path is passed in the `:./<path>` form, which git resolves against the process's directory prefix
 * rather than against the top of the working tree. That is what keeps this correct when the root it is
 * called with is not itself the repository root - this repo's `workflow-scripts` is a self-contained
 * subpackage with its own `package.json`, and it carries a vendored tree of its own.
 *
 * No smudge filter or line-ending conversion is applied: `git cat-file blob` hands back the blob verbatim,
 * which for this repo means the LF-normalized bytes `.gitattributes` declares.
 *
 * @param root - The directory the path is relative to, which is also the directory git is run from.
 * @param repoRelativePath - The file's path relative to `root`, posix-spelled.
 * @returns The staged bytes, or `null` when the path has no stage-0 index entry - it is untracked, staged
 * for deletion, or unmerged.
 */
export function readIndexContent(root: string, repoRelativePath: string): Promise<Buffer | null> {
  return new Promise((resolve, reject) => {
    /*
     * No shell: a path is passed as an argv entry rather than as text something has to quote, and the
     * leading `:` is a git revision sigil that a shell would be free to read as its own.
     */
    const child = spawn('git', ['-C', root, 'cat-file', 'blob', `:./${repoRelativePath}`], {
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true
    });

    const chunks: Buffer[] = [];
    let stderr = '';

    child.stdout.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    child.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString('utf-8');
    });

    child.on('error', (error: Error) => {
      reject(new Error(`Could not run \`git cat-file\` for ${repoRelativePath}.`, { cause: error }));
    });

    child.on('close', (exitCode) => {
      if (exitCode === 0) {
        resolve(Buffer.concat(chunks));
        return;
      }

      /*
       * Git answers a path it cannot find in the index with exit 128 and a `fatal:` line, and the exit code
       * alone does not say which `fatal:` it was - so the stderr text is what separates "no such index
       * entry" from everything else. Only the first is the absence of a staged blob, and the caller decides
       * what that means for it: the vendored-rules gate finds its files by walking the tree rather than by
       * asking git, so it can legitimately reach a file git has never heard of. Anything else - no
       * repository here, no git on PATH - is thrown rather than quietly answered with the working tree,
       * because a gate whose subject is "the bytes a commit would write" has no honest answer where there
       * are no commits.
       */
      if (isMissingPath(stderr)) {
        resolve(null);
        return;
      }

      reject(new Error(`\`git cat-file blob :./${repoRelativePath}\` failed with exit code ${exitCode === null ? '(null)' : String(exitCode)}:\n${stderr.trim()}`));
    });
  });
}

function isMissingPath(stderr: string): boolean {
  return stderr.includes('does not exist') || stderr.includes('not in the index') || stderr.includes('Not a valid object name');
}

/**
 * @file
 *
 * Reads one line from the operator's terminal.
 *
 * This exists as its own module because two unrelated things now ask the operator a question -- the release
 * offer in `helpers/handBack.ts` and the one-time-password fallback in `helpers/npm.ts` -- and the awkward
 * parts of asking are the same both times: a prompt that has to be written by hand to be seen at all, a
 * stream that can close mid-question, and a caller that must never be able to hang a CI job. Those were
 * worked out once, for the yes/no question, and copying them into the second caller would have left two
 * copies of a subtlety neither gate can see.
 *
 * `helpers/npm.ts` cannot simply import the asking out of `helpers/handBack.ts`: that module already imports
 * `npm.ts`, and the import it needs is a value rather than a type, so the two would form a real cycle.
 */

import { once } from 'node:events';
import process from 'node:process';
import { createInterface } from 'node:readline/promises';

/**
 * Asks the operator one question and resolves to their answer, trimmed -- or to `null` when there is nobody
 * to answer it.
 *
 * `null` covers both ways that happens, because no caller here treats them differently: there is no terminal
 * attached, or the input stream closed before an answer arrived. Both mean "carry on without one".
 *
 * Three details, each of them a measured failure rather than caution:
 *
 * - **The `isTTY` check comes first.** Every caller of this module is imported by a script that a CI job
 *   could one day run, and a prompt waiting for a line nobody will type is a hung job. Failing that check
 *   answers `null` immediately instead.
 * - **The question is written directly rather than handed to `question()`.** readline echoes its prompt only
 *   when it decides it is driving a terminal, and it decides that from `output.isTTY`. Redirect stdout to a
 *   file or a pager and the prompt silently disappears while the process still waits for a line -- which is
 *   indistinguishable from a hang. Writing it ourselves makes the question unconditional.
 * - **The answer is raced against the interface's own `close`.** Ctrl+D closes the stream out from under the
 *   pending question and `question()` then settles NEITHER way -- measured 2026-09-15: the process ends on
 *   Node's `Detected unsettled top-level await` warning with nothing printed, which reads as a hang at the
 *   very last step of whatever was being handed back. Racing `close` turns that into the `null` it is.
 */
export async function askLine(question: string): Promise<null | string> {
  if (!process.stdin.isTTY) {
    return null;
  }

  const readlineInterface = createInterface({ input: process.stdin, output: process.stdout });

  try {
    process.stdout.write(question);

    const answer = await Promise.race([
      readlineInterface.question(''),
      once(readlineInterface, 'close').then(() => null)
    ]);

    return answer === null ? null : answer.trim();
  } finally {
    readlineInterface.close();
  }
}

/**
 * @file
 *
 * Makes sure this machine is logged in to npm before `bootstrap-new-package` claims a name, offering to run
 * `npm login` itself when it is not.
 *
 * The bootstrap is the only step in the release path that needs a local npm credential, so it is the one place
 * a machine with no login, or an expired token, meets it. Until 2026-11-14 that ended the run with an error
 * telling the operator to run `npm login` and start the script again (`1.15.1 public`, 2026-11-13). The error
 * was right, but it was a dead end the operator had to restart from. The script already holds the terminal, so
 * it can run `npm login` there itself and carry on.
 *
 * It lives in its own module, with its effects passed in, because the decision is the part worth testing and
 * every effect it makes -- a registry call, a prompt, an interactive login -- is one a unit test cannot make.
 */

import { spawn } from 'node:child_process';
import process from 'node:process';

import { getNpmUsername } from './npm.ts';
import { askLine } from './prompt.ts';

/**
 * The effects {@link ensureNpmLogin} makes, passed in so a test can stand in for each one.
 */
export interface EnsureNpmLoginDependencies {
  /**
   * Asks the operator one question, resolving to `null` when there is nobody to answer it.
   */
  readonly askLine: (this: void, question: string) => Promise<null | string>;
  /**
   * Resolves the npm account this machine's credential belongs to, or `null` when the registry refuses it.
   */
  readonly getNpmUsername: (this: void) => Promise<null | string>;
  /**
   * Runs `npm login` on the operator's terminal and resolves to its exit code.
   */
  readonly runNpmLogin: (this: void) => Promise<null | number>;
}

const DEFAULT_DEPENDENCIES: EnsureNpmLoginDependencies = {
  askLine,
  getNpmUsername,
  runNpmLogin
};

/**
 * Resolves the npm account this machine is logged in as, logging in first when it is not and the operator
 * agrees. Throws when there is still no account at the end, with `reason` saying why one was needed.
 *
 * With no terminal, {@link EnsureNpmLoginDependencies.askLine} answers `null` and this throws exactly as the
 * script did before, so a run that nobody is watching never waits on a login prompt.
 *
 * The login is offered once. A second `npm whoami` after it decides the outcome, rather than `npm login`'s
 * exit code: a login can exit 0 and still leave a token the registry refuses, and the bootstrap needs the
 * account, not the exit code.
 */
export async function ensureNpmLogin(reason: string, dependencies: EnsureNpmLoginDependencies = DEFAULT_DEPENDENCIES): Promise<string> {
  const username = await dependencies.getNpmUsername();

  if (username) {
    return username;
  }

  const answer = await dependencies.askLine(
    `npm does not accept this machine's credential, and ${reason}. Run \`npm login\` now? [Y/n] `
  );

  if (answer !== null && !/^n/i.test(answer)) {
    const exitCode = await dependencies.runNpmLogin();

    if (exitCode === 0) {
      const usernameAfterLogin = await dependencies.getNpmUsername();

      if (usernameAfterLogin) {
        return usernameAfterLogin;
      }
    }

    throw new Error(
      `\`npm login\` ${exitCode === 0 ? 'finished, but npm still does not accept this machine\'s credential' : `failed with exit code ${String(exitCode)}`},`
        + ` and ${reason}. Fix the login and re-run this script -- it is safe to re-run.`
    );
  }

  throw new Error(
    `npm rejected this machine's credential, and ${reason}. Run \`npm login\` in this terminal and re-run this`
      + ' script -- it is safe to re-run, and it is the only step in the release path that needs a local npm'
      + ' credential at all.'
  );
}

/**
 * Runs `npm login` with the terminal's own streams, so its browser link and one-time-password prompt reach the
 * operator, and resolves to its exit code.
 */
function runNpmLogin(): Promise<null | number> {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['login'], {
      cwd: process.cwd(),
      shell: true,
      stdio: 'inherit'
    });

    child.on('error', reject);
    child.on('close', resolve);
  });
}

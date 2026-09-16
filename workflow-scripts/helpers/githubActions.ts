/**
 * @file
 *
 * The CI-only guard the workflow-dispatched scripts stand behind.
 *
 * Two scripts in this tree are run by a workflow and by nothing else: `check-obsidian-package-update.ts` and
 * `publish-release.ts`. Neither has an npm script, which is the first half of saying so; this is the half
 * that holds when somebody runs the file directly anyway.
 *
 * It is a typo detector, not a security boundary: the variable is one `export` away for anyone who means it.
 * That is the right strength -- the only callers that matter are the two workflows, and the failure being
 * guarded against is a hand-run, not an attacker.
 */

import process from 'node:process';

/*
 * The variable GitHub Actions sets on every runner. Read directly rather than through `helpers/env-toggle.ts`,
 * whose switches are named after the npm script currently running: neither caller has an npm script, which is
 * half of why running either by hand is always a mistake.
 */
const GITHUB_ACTIONS_ENV_VARIABLE_NAME = 'GITHUB_ACTIONS';

/**
 * Refuses to run anywhere but a GitHub Actions runner.
 *
 * `consequences` is the sentence completing "By hand it would ...", and it is a parameter rather than a fixed
 * string because the whole value of the message is naming what THIS script would have done. A guard that only
 * says "CI-only" tells a reader it was blocked; one that lists the four irreversible steps tells them why
 * being blocked was a favour.
 *
 * The workflow file is derived rather than passed: both callers are dispatched by a workflow named after the
 * script. Should a third script ever break that, it takes a parameter -- not a wrong file name.
 *
 * @param scriptName - The script's base name, without extension, e.g. `publish-release`.
 * @param consequences - What a hand-run would do, completing "By hand it would ...".
 */
export function assertRunningInGitHubActions(scriptName: string, consequences: string): void {
  if (process.env[GITHUB_ACTIONS_ENV_VARIABLE_NAME]) {
    return;
  }

  throw new Error(
    `${scriptName} is CI-only and is run by .github/workflows/${scriptName}.yml.`
      + ` By hand it would ${consequences} -- which is why there is no npm script for it.`
      + ` Set ${GITHUB_ACTIONS_ENV_VARIABLE_NAME} only if you mean every one of those.`
  );
}

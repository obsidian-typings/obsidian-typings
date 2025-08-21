import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';
import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';
import { checkGitRepoClean } from 'obsidian-dev-utils/ScriptUtils/version';

await wrapCliTask(async () => {
    await checkGitRepoClean();

    const isBeta = process.argv[2] === 'beta';

    if (isBeta) {
      await exec('git push origin HEAD:refs/tags/release-candidate-beta');
    }

    await exec('git push origin HEAD:refs/tags/release-candidate');
    await exec('git push origin');
});

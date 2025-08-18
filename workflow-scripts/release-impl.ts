import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';
import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';
import { checkGitRepoClean } from 'obsidian-dev-utils/ScriptUtils/version';

await wrapCliTask(async () => {
    await checkGitRepoClean();

    const isBeta = process.argv[2] === 'beta';

    await exec('git tag release-candidate -m release-candidate --force');

    if (isBeta) {
        await exec('git tag release-candidate-beta -m release-candidate-beta --force');
    }

    await exec('git push origin --follow-tags');
});

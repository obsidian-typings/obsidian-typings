import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';
import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';
import { checkGitRepoClean } from 'obsidian-dev-utils/ScriptUtils/version';

await wrapCliTask(async () => {
    await checkGitRepoClean();
    await exec('git tag release-candidate -m release-candidate');
    await exec('git tag release-candidate-beta -m release-candidate-beta');
    await exec('git push origin --follow-tags');
});

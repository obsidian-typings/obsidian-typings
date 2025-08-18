import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';
import {
  readFile,
  writeFile
} from 'obsidian-dev-utils/ScriptUtils/NodeModules';

import {
  type BranchSpec,
  generateBranchName
} from './branchSpec.ts';
import { commit } from './git.ts';
import { getLatestVersion } from './version.ts';

export async function generateReadme(branchSpec: BranchSpec): Promise<boolean> {
  const readmeTemplate = await readFile('./workflow-scripts/README.template.md', 'utf-8');
  const readme = await readFile('README.md', 'utf-8');

  const TODO_URL = 'https://obsidian.md/changelog/TODO-SET-CHANGELOG-URL';
  const changelogUrl = (/https:\/\/obsidian\.md\/changelog\/[^"]+/.exec(readme))?.[0] ?? TODO_URL;
  let shouldUpdateReadme = changelogUrl === TODO_URL;
  let updatedReadme = fillReadmeTemplate(readmeTemplate, branchSpec, changelogUrl);
  if (readme !== updatedReadme) {
    if (!changelogUrl.includes(branchSpec.obsidianVersion)) {
      updatedReadme = fillReadmeTemplate(readmeTemplate, branchSpec, TODO_URL);
      shouldUpdateReadme = true;
    }
    await writeFile('README.md', updatedReadme, 'utf-8');
    await exec('git add README.md');
    await commit('chore: generate README.md from template');
    await exec('git push');
  }

  return shouldUpdateReadme;
}

function fillReadmeTemplate(readmeTemplate: string, branchSpec: BranchSpec, changelogUrl: string): string {
  return readmeTemplate
    .replaceAll('{{OBSIDIAN_VERSION}}', branchSpec.obsidianVersion)
    .replaceAll('{{CHANNEL}}', branchSpec.channel)
    .replaceAll('{{CHANGELOG_URL}}', changelogUrl);
}

export async function generateMainReadme(): Promise<void> {
  await exec('git checkout main');

  const readme = await readFile('README.md', 'utf-8');
  let updatedReadme = readme;

  for (const channel of ['public', 'catalyst'] as const) {
    const latestVersion = await getLatestVersion(channel);
    const sourceRegExp = new RegExp(`\\n- Latest \`${channel}\` release: .*`, 'g');
    updatedReadme = updatedReadme.replaceAll(sourceRegExp, generateMainReadmeLine({ channel, obsidianVersion: latestVersion }));
  }

  if (readme === updatedReadme) {
    return;
  }

  await writeFile('README.md', updatedReadme, 'utf-8');
  await exec('git add README.md');
  await commit('chore: generate README.md from template');
  await exec('git push');
}

function generateMainReadmeLine(branchSpec: BranchSpec): string {
  const branchName = generateBranchName(branchSpec);
  return `- Latest \`${branchSpec.channel}\` release: [\`${branchName}\`](https://github.com/Fevol/obsidian-typings/tree/${branchName})`;
}

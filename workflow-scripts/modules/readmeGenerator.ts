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

export async function generateReadme(branchSpec: BranchSpec, changelogUrl: string): Promise<void> {
  const readmeTemplate = await readFile('./workflow-scripts/README.template.md', 'utf-8');
  const readme = await readFile('README.md', 'utf-8');

  const updatedReadme = fillReadmeTemplate(readmeTemplate, branchSpec, changelogUrl);
  if (readme === updatedReadme) {
    return;
  }
  await writeFile('README.md', updatedReadme, 'utf-8');
  await exec('git add README.md');
  await commit('chore: generate README.md from template');
  await exec('git push');
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
  return `\n- Latest \`${branchSpec.channel}\` release: [\`${branchName}\`](https://github.com/Fevol/obsidian-typings/tree/${branchName})`;
}

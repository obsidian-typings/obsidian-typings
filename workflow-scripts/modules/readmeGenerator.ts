import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';
import {
  readFile,
  writeFile
} from 'obsidian-dev-utils/ScriptUtils/NodeModules';

import type { BranchSpec } from './branchSpec.ts';

export async function generateReadme(branchSpec: BranchSpec): Promise<boolean> {
  const readmeTemplate = await readFile('./workflow-scripts/README.template.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  const TODO_URL = 'https://obsidian.md/changelog/TODO-SET-CHANGELOG-URL';
  const changelogUrl = (/https:\/\/obsidian\.md\/changelog\/[^"]+/.exec(readme))?.[0] ?? TODO_URL;
  let shouldUpdateReadme = changelogUrl === TODO_URL;
  let updatedReadme = fillReadmeTemplate(readmeTemplate, branchSpec, changelogUrl);
  if (readme !== updatedReadme) {
    if (!changelogUrl.includes(branchSpec.obsidianVersion)) {
      updatedReadme = fillReadmeTemplate(readmeTemplate, branchSpec, TODO_URL);
      shouldUpdateReadme = true;
    }
    await writeFile('README.md', updatedReadme, 'utf8');
    await exec('git add README.md');
    await exec('git commit -m "chore: generate README.md from template"');
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

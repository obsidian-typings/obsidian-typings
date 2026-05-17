import { compare } from 'semver';

import { execFromRoot } from './exec.ts';

export interface BranchSpec {
  channel: 'catalyst' | 'public';
  obsidianVersion: string;
}

export function generateBranchName(branchSpec: BranchSpec): string {
  return `release/obsidian-${branchSpec.channel}/${branchSpec.obsidianVersion}`;
}

export async function getLatestVersion(channel: 'catalyst' | 'public'): Promise<string> {
  await execFromRoot('git fetch');
  const remotePrefix = `origin/release/obsidian-${channel}/`;
  const branches = await execFromRoot(`git branch --list --remote "${remotePrefix}*"`);
  const versions = branches.split('\n').filter(Boolean).map((branch) => branch.trim().replace(remotePrefix, ''));
  versions.sort((a, b) => compare(a, b));
  const latestVersion = versions.at(-1);
  if (!latestVersion) {
    throw new Error(`No versions found for ${channel} channel.`);
  }
  return latestVersion;
}

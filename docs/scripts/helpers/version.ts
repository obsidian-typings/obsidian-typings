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
  versions.sort(compareSemver);
  const latestVersion = versions.at(-1);
  if (!latestVersion) {
    throw new Error(`No versions found for ${channel} channel.`);
  }
  return latestVersion;
}

function compareSemver(a: string, b: string): number {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const diff = (partsA[i] ?? 0) - (partsB[i] ?? 0);
    if (diff !== 0) {
      return diff;
    }
  }
  return 0;
}

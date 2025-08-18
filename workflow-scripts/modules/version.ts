import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';
import { compare } from 'semver';

export async function getLatestVersion(channel: 'catalyst' | 'public'): Promise<string> {
  await exec('git fetch');
  const remotePrefix = `origin/release/obsidian-${channel}/`;
  const branches = await exec(`git branch --list --remote "${remotePrefix}*"`);
  const versions = branches.split('\n').filter(Boolean).map((branch) => branch.trim().replace(remotePrefix, ''));
  versions.sort((a, b) => compare(a, b));
  const latestVersion = versions.at(-1);
  if (!latestVersion) {
    throw new Error(`No versions found for ${channel} channel.`);
  }
  return latestVersion;
}

export interface BranchSpec {
  channel: 'catalyst' | 'public';
  obsidianVersion: string;
}

export function parseBranchSpec(refName: string): BranchSpec {
  const REG_EXP = /^release\/obsidian-(?<Channel>public|catalyst)\/(?<Version>\d+\.\d+\.\d+)$/;
  const match = REG_EXP.exec(refName);
  if (!match) {
    throw new Error(
      `GITHUB_REF_NAME "${refName}" is not in the expected format. Expected format: "release/obsidian-public/x.y.z" or "release/obsidian-catalyst/x.y.z"`
    );
  }

  return {
    channel: (match.groups?.['Channel'] ?? 'public') as 'catalyst' | 'public',
    obsidianVersion: match.groups?.['Version'] ?? ''
  };
}

export function generateBranchName(branchSpec: BranchSpec): string {
  return `release/obsidian-${branchSpec.channel}/${branchSpec.obsidianVersion}`;
}

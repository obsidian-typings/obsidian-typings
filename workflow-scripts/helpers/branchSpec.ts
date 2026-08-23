export const CHANNELS = ['public', 'catalyst'] as const;

export type Channel = typeof CHANNELS[number];

export interface BranchSpec {
  channel: Channel;
  obsidianVersion: string;
}

export function parseBranchSpec(refName: string): BranchSpec {
  const REG_EXP = /^release\/obsidian-(?<Channel>public|catalyst)\/(?<Version>\d+\.\d+\.\d+)$/;
  const match = REG_EXP.exec(refName);
  if (!match) {
    throw new Error(
      `"${refName}" is not in the expected format. Expected format: "release/obsidian-public/x.y.z" or "release/obsidian-catalyst/x.y.z"`
    );
  }

  return {
    channel: (match.groups?.['Channel'] ?? 'public') as Channel,
    obsidianVersion: match.groups?.['Version'] ?? ''
  };
}

export function generateBranchName(branchSpec: BranchSpec): string {
  return `release/obsidian-${branchSpec.channel}/${branchSpec.obsidianVersion}`;
}

export function parseChannel(value: string | undefined): Channel {
  const channel = CHANNELS.find((candidate) => candidate === value);
  if (!channel) {
    throw new Error(`Expected CHANNEL to be one of ${CHANNELS.join(', ')}, got "${value ?? ''}".`);
  }

  return channel;
}

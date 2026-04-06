import { execFromRoot } from './helpers/root.ts';

export async function spellcheck(paths: string[] = []): Promise<void> {
  if (paths.length === 0) {
    paths = ['.'];
  }

  await execFromRoot(['npx', 'cspell', ...paths, '--no-progress', '--no-must-find-files']);
}

async function main(): Promise<void> {
  const [, , ...paths] = process.argv;
  await spellcheck(paths);
}

await main();

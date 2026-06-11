import { execFromRoot } from './helpers/root.ts';

async function main() {
  const [, , ...paths] = process.argv;
  await spellcheck(paths);
}

export async function spellcheck(paths: string[] = []): Promise<void> {
  if (paths.length === 0) {
    paths = ['.'];
  }

  await execFromRoot(['npx', 'cspell', { batchedArgs: paths }, '--no-progress', '--no-must-find-files']);
}

await main();

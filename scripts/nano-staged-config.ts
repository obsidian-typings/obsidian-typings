interface NanoStagedContext {
  filenames: string[];
}

type NanoStagedHandler = (ctx: NanoStagedContext) => string[];

const BATCH_SIZE = 30;

export const config: Record<string, NanoStagedHandler> = {
  '*': ({ filenames }) => batch(filenames).map((b) => `npm run spellcheck -- ${join(b)}`),
  '*.md': ({ filenames }) => batch(filenames).map((b) => `npm run lint:md:fix -- ${join(b)}`),
  '*.{ts,tsx,mts}': ({ filenames }) =>
    batch(filenames).flatMap((b) => [
      `npm run lint:fix -- ${join(b)}`,
      `npm run format -- ${join(b)}`
    ])
};

function batch(filenames: string[]): string[][] {
  const result: string[][] = [];
  for (let i = 0; i < filenames.length; i += BATCH_SIZE) {
    result.push(filenames.slice(i, i + BATCH_SIZE));
  }
  return result;
}

function join(filenames: string[]): string {
  return filenames.join(' ');
}

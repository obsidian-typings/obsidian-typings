export const config: Record<string, string[]> = {
  '*': [
    'npm run spellcheck --'
  ],
  '*.md': [
    'npm run lint:md:fix --'
  ],
  '*.{ts,tsx,mts}': [
    'npm run lint:fix --',
    'npm run format --'
  ]
};

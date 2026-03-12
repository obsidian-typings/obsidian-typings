export const config: Record<string, string[]> = {
  '*': [
    'npm run spellcheck --'
  ],
  '*.{ts,tsx,mts}': [
    'npm run lint:fix --',
    'npm run format --'
  ]
};

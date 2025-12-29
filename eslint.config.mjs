import gts from 'gts';

export default [
  { ignores: ["build/", "playwright-report/", "test-results/", "node_modules/"] },
  ...gts,
];

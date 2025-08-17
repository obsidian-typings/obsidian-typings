import { execSync } from 'node:child_process';

execSync('ls', { stdio: 'inherit' });

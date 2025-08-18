import process from 'node:process';
import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';

await wrapCliTask(async () => {
  console.log(process.env);
});


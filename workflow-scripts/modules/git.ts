import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';

export async function commit(message: string): Promise<void> {
  const USER_NAME = 'github-actions[bot]';
  const USER_EMAIL = '41898282+github-actions[bot]@users.noreply.github.com';
  await exec(`git -c user.name="${USER_NAME}" -c user.email="${USER_EMAIL}" commit -m "${message}"`);
}

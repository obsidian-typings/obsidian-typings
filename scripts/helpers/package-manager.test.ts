/**
 * @file
 *
 * Tests for the package-manager detection the script hops run through, and for the `node_modules/.bin`
 * shim resolution the tool hops run through.
 *
 * Every sibling repo is npm-only today -- a lone `package-lock.json` and no `packageManager` field -- so
 * the tree itself can only ever exercise the npm path. Everything else this module resolves (bun, pnpm,
 * yarn, a corepack declaration, two managers claiming the same tree) is unreachable in-repo, which is
 * exactly why it is pinned here.
 *
 * The trees are REAL folders under the OS temp directory rather than a mocked `node:fs`. What the module
 * does is probe a filesystem, so a real tree is the honest fixture for it: the lockfile precedence, the
 * two-managers-claiming-one-root warning and the corepack declaration are all decided by what is actually
 * on disk, and a mock only ever proves that the probe called the function it was told to call. It also
 * makes the file environment-agnostic, so it runs identically here and in the `node` project
 * `obsidian-integration-testing` runs this same file under.
 *
 * The shim probe is the one thing here that also depends on `process.platform`, because Windows can only
 * run the executable shim forms. That half is stubbed rather than skipped: a suite that only exercised the
 * platform it happens to run on would leave the other branch untested on every machine, and the
 * Windows-only rule it encodes -- never pick the `sh` shim that carries no extension -- is exactly the one whose
 * violation fails at the far end of a build rather than here.
 */

import type { MockInstance } from 'vitest';

import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path/posix';
import process from 'node:process';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';

import {
  getPackageManager,
  getPackageManagerRunCommand,
  PackageManager,
  resolveToolCommand
} from './package-manager.ts';
import {
  getRootFolder,
  toPosixPath
} from './root.ts';

/**
 * The shape of a temporary project tree to lay down.
 */
interface CreateProjectParams {
  /**
   * The shim file names to create in the project's own `node_modules/.bin`, which is created only when
   * this is non-empty -- an absent `node_modules` is itself a case the probe has to handle.
   */
  readonly binShimNames?: readonly string[];

  /**
   * The lockfile names to create at the project root.
   */
  readonly lockfileNames?: readonly string[];

  /**
   * The `package.json` contents. Defaults to an empty object, which declares no package manager.
   */
  readonly packageJsonText?: string;
}

/**
 * The tool every shim case asks for.
 *
 * Deliberately a name no real package publishes: the probe walks UP from the project root, so a tool that
 * happened to be installed in some ancestor of the OS temp directory would silently satisfy the cases that
 * assert on the no-shim fallback.
 */
const ABSENT_TOOL = 'package-manager-test-tool';

const ORIGINAL_PLATFORM = process.platform;
const ORIGINAL_USER_AGENT = process.env['npm_config_user_agent'];

let consoleWarnSpy: MockInstance<typeof console.warn>;
let projectCount = 0;
let temporaryRoot: string;

/**
 * Lays down a temporary project tree and returns its root.
 *
 * Each tree gets its own folder, because the module reports a lockfile disagreement once per root and a
 * shared folder would make one test's warning invisible to the next.
 *
 * @param params - The tree to create.
 * @returns The absolute posix path of the project root.
 */
function createProject(params: CreateProjectParams = {}): string {
  const {
    binShimNames = [],
    lockfileNames = [],
    packageJsonText = '{}'
  } = params;

  projectCount++;
  const root = join(temporaryRoot, `project-${String(projectCount)}`);
  mkdirSync(root);
  writeFileSync(join(root, 'package.json'), packageJsonText);

  for (const lockfileName of lockfileNames) {
    writeFileSync(join(root, lockfileName), '');
  }

  if (binShimNames.length > 0) {
    const binFolder = join(root, 'node_modules', '.bin');
    mkdirSync(binFolder, { recursive: true });
    for (const binShimName of binShimNames) {
      writeFileSync(join(binFolder, binShimName), '');
    }
  }

  return root;
}

/**
 * Overrides the reported platform for the duration of a test.
 *
 * `process.platform` is a read-only property rather than a variable, so it is redefined rather than
 * assigned, and `afterEach` restores it whether or not a test set it.
 *
 * @param platform - The platform to report.
 */
function setPlatform(platform: string): void {
  Object.defineProperty(process, 'platform', { configurable: true, value: platform });
}

beforeAll(() => {
  const temporaryRootPrefix = join(toPosixPath(tmpdir()), 'package-manager-');
  temporaryRoot = toPosixPath(mkdtempSync(temporaryRootPrefix));
});

afterAll(() => {
  rmSync(temporaryRoot, { force: true, recursive: true });
});

beforeEach(() => {
  delete process.env['npm_config_user_agent'];
  consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
});

afterEach(() => {
  consoleWarnSpy.mockRestore();
  Object.defineProperty(process, 'platform', { configurable: true, value: ORIGINAL_PLATFORM });
  if (ORIGINAL_USER_AGENT === undefined) {
    delete process.env['npm_config_user_agent'];
  } else {
    process.env['npm_config_user_agent'] = ORIGINAL_USER_AGENT;
  }
});

describe('getPackageManager', () => {
  it('should detect bun from bun.lock', () => {
    expect(getPackageManager(createProject({ lockfileNames: ['bun.lock'] }))).toBe(PackageManager.Bun);
  });

  it('should detect bun from bun.lockb', () => {
    expect(getPackageManager(createProject({ lockfileNames: ['bun.lockb'] }))).toBe(PackageManager.Bun);
  });

  it('should detect pnpm from pnpm-lock.yaml', () => {
    expect(getPackageManager(createProject({ lockfileNames: ['pnpm-lock.yaml'] }))).toBe(PackageManager.Pnpm);
  });

  it('should detect yarn from yarn.lock', () => {
    expect(getPackageManager(createProject({ lockfileNames: ['yarn.lock'] }))).toBe(PackageManager.Yarn);
  });

  it('should detect npm from package-lock.json', () => {
    expect(getPackageManager(createProject({ lockfileNames: ['package-lock.json'] }))).toBe(PackageManager.Npm);
  });

  it('should resolve from the project root rather than the folder it is called with', () => {
    const root = createProject({ lockfileNames: ['bun.lock'] });
    const nestedFolder = join(root, 'scripts', 'helpers');
    mkdirSync(nestedFolder, { recursive: true });
    expect(getPackageManager(nestedFolder)).toBe(PackageManager.Bun);
  });

  it('should fall back to the user agent when no lockfile exists', () => {
    process.env['npm_config_user_agent'] = 'bun/1.4.0 npm/? node/v26.5.0 win32 x64';
    expect(getPackageManager(createProject())).toBe(PackageManager.Bun);
  });

  it('should read npm from the user agent when no lockfile exists', () => {
    process.env['npm_config_user_agent'] = 'npm/12.0.2 node/v26.5.0 win32 x64 workspaces/false';
    expect(getPackageManager(createProject())).toBe(PackageManager.Npm);
  });

  it('should read pnpm from the user agent when no lockfile exists', () => {
    process.env['npm_config_user_agent'] = 'pnpm/11.24.0 npm/? node/v26.5.0 win32 x64';
    expect(getPackageManager(createProject())).toBe(PackageManager.Pnpm);
  });

  it('should read yarn from the user agent when no lockfile exists', () => {
    process.env['npm_config_user_agent'] = 'yarn/1.22.22 npm/? node/v26.5.0 win32 x64';
    expect(getPackageManager(createProject())).toBe(PackageManager.Yarn);
  });

  it('should ignore an unrecognized user agent', () => {
    process.env['npm_config_user_agent'] = 'deno/2.0.0 node/v26.5.0';
    expect(getPackageManager(createProject())).toBe(PackageManager.Npm);
  });

  it('should ignore a malformed user agent', () => {
    process.env['npm_config_user_agent'] = 'nonsense';
    expect(getPackageManager(createProject())).toBe(PackageManager.Npm);
  });

  it('should default to npm when there is no lockfile and no user agent', () => {
    expect(getPackageManager(createProject())).toBe(PackageManager.Npm);
  });

  it('should resolve this repo as npm-owned when no folder is given', () => {
    expect(getPackageManager()).toBe(PackageManager.Npm);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should treat both bun lockfiles as a single claim', () => {
    expect(getPackageManager(createProject({ lockfileNames: ['bun.lock', 'bun.lockb'] }))).toBe(PackageManager.Bun);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});

describe('getPackageManager with several lockfiles', () => {
  it('should prefer the manager that launched us when it owns one of the lockfiles', () => {
    process.env['npm_config_user_agent'] = 'npm/12.0.2 node/v26.5.0 win32 x64 workspaces/false';
    expect(getPackageManager(createProject({ lockfileNames: ['pnpm-lock.yaml', 'package-lock.json'] }))).toBe(PackageManager.Npm);
  });

  it('should fall back to the documented order when no user agent is set', () => {
    expect(getPackageManager(createProject({ lockfileNames: ['pnpm-lock.yaml', 'package-lock.json'] }))).toBe(PackageManager.Pnpm);
  });

  it('should ignore a user agent that owns none of the lockfiles', () => {
    process.env['npm_config_user_agent'] = 'yarn/1.22.22 npm/? node/v26.5.0 win32 x64';
    expect(getPackageManager(createProject({ lockfileNames: ['pnpm-lock.yaml', 'package-lock.json'] }))).toBe(PackageManager.Pnpm);
  });

  it('should name every lockfile, the declaration and the winner in the warning', () => {
    const root = createProject({ lockfileNames: ['pnpm-lock.yaml', 'package-lock.json'] });
    getPackageManager(root);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    const message = consoleWarnSpy.mock.calls[0]?.[0] as string;
    expect(message).toContain(root);
    expect(message).toContain('pnpm-lock.yaml, package-lock.json');
    expect(message).toContain('not set');
    expect(message).toContain('Using pnpm');
  });

  it('should warn once per project however often it is called', () => {
    const root = createProject({ lockfileNames: ['pnpm-lock.yaml', 'package-lock.json'] });
    getPackageManager(root);
    getPackageManager(root);
    getPackageManager(root);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  });
});

describe('getPackageManager with a packageManager declaration', () => {
  it('should prefer the declaration over a contradicting lockfile', () => {
    const root = createProject({
      lockfileNames: ['package-lock.json'],
      packageJsonText: '{ "packageManager": "pnpm@11.24.0" }'
    });
    expect(getPackageManager(root)).toBe(PackageManager.Pnpm);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  });

  it('should read the declaration when there is no lockfile at all', () => {
    const root = createProject({ packageJsonText: '{ "packageManager": "yarn@4.2.2" }' });
    expect(getPackageManager(root)).toBe(PackageManager.Yarn);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should stay silent when the declaration agrees with the lockfile', () => {
    const root = createProject({
      lockfileNames: ['pnpm-lock.yaml'],
      packageJsonText: '{ "packageManager": "pnpm@11.24.0" }'
    });
    expect(getPackageManager(root)).toBe(PackageManager.Pnpm);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should ignore a declaration naming a manager we do not handle', () => {
    const root = createProject({
      lockfileNames: ['package-lock.json'],
      packageJsonText: '{ "packageManager": "deno@2.0.0" }'
    });
    expect(getPackageManager(root)).toBe(PackageManager.Npm);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should ignore a declaration that omits the version', () => {
    const root = createProject({
      lockfileNames: ['package-lock.json'],
      packageJsonText: '{ "packageManager": "pnpm" }'
    });
    expect(getPackageManager(root)).toBe(PackageManager.Npm);
  });

  it('should ignore an empty declaration', () => {
    const root = createProject({
      lockfileNames: ['package-lock.json'],
      packageJsonText: '{ "packageManager": "" }'
    });
    expect(getPackageManager(root)).toBe(PackageManager.Npm);
  });

  it('should ignore an unparsable package.json', () => {
    const root = createProject({
      lockfileNames: ['package-lock.json'],
      packageJsonText: 'not json at all'
    });
    expect(getPackageManager(root)).toBe(PackageManager.Npm);
  });
});

describe('getPackageManagerRunCommand', () => {
  it('should run scripts through npm', () => {
    expect(getPackageManagerRunCommand(createProject({ lockfileNames: ['package-lock.json'] }))).toEqual(['npm', 'run']);
  });

  it('should run scripts through bun', () => {
    expect(getPackageManagerRunCommand(createProject({ lockfileNames: ['bun.lock'] }))).toEqual(['bun', 'run']);
  });

  it('should run scripts through pnpm', () => {
    expect(getPackageManagerRunCommand(createProject({ lockfileNames: ['pnpm-lock.yaml'] }))).toEqual(['pnpm', 'run']);
  });

  it('should run scripts through yarn', () => {
    expect(getPackageManagerRunCommand(createProject({ lockfileNames: ['yarn.lock'] }))).toEqual(['yarn', 'run']);
  });
});

describe('resolveToolCommand', () => {
  it('should prefer the cmd shim on Windows', () => {
    const root = createProject({ binShimNames: [ABSENT_TOOL, `${ABSENT_TOOL}.cmd`] });
    setPlatform('win32');
    expect(resolveToolCommand({ cwd: root, tool: ABSENT_TOOL })).toEqual([`${root}/node_modules/.bin/${ABSENT_TOOL}.cmd`]);
  });

  it('should resolve the exe shim on Windows when only the bun form exists', () => {
    const root = createProject({ binShimNames: [`${ABSENT_TOOL}.exe`] });
    setPlatform('win32');
    expect(resolveToolCommand({ cwd: root, tool: ABSENT_TOOL })).toEqual([`${root}/node_modules/.bin/${ABSENT_TOOL}.exe`]);
  });

  it('should resolve the bat shim on Windows when it is the only one', () => {
    const root = createProject({ binShimNames: [`${ABSENT_TOOL}.bat`] });
    setPlatform('win32');
    expect(resolveToolCommand({ cwd: root, tool: ABSENT_TOOL })).toEqual([`${root}/node_modules/.bin/${ABSENT_TOOL}.bat`]);
  });

  it('should never resolve the sh shim with no extension on Windows', () => {
    const root = createProject({
      binShimNames: [ABSENT_TOOL],
      lockfileNames: ['package-lock.json']
    });
    setPlatform('win32');
    expect(resolveToolCommand({ cwd: root, tool: ABSENT_TOOL })).toEqual(['npx', ABSENT_TOOL]);
  });

  it('should resolve the shim with no extension everywhere else', () => {
    const root = createProject({ binShimNames: [ABSENT_TOOL] });
    setPlatform('linux');
    expect(resolveToolCommand({ cwd: root, tool: ABSENT_TOOL })).toEqual([`${root}/node_modules/.bin/${ABSENT_TOOL}`]);
  });

  it('should find a shim hoisted above the package that asks for it', () => {
    const root = createProject({ binShimNames: [ABSENT_TOOL] });
    const nestedPackage = join(root, 'packages', 'a');
    mkdirSync(nestedPackage, { recursive: true });
    writeFileSync(join(nestedPackage, 'package.json'), '{}');
    setPlatform('linux');
    expect(resolveToolCommand({ cwd: nestedPackage, tool: ABSENT_TOOL })).toEqual([`${root}/node_modules/.bin/${ABSENT_TOOL}`]);
  });

  it('should fall back to the npm exec form when no shim exists', () => {
    const root = createProject({ lockfileNames: ['package-lock.json'] });
    setPlatform('linux');
    expect(resolveToolCommand({ cwd: root, tool: ABSENT_TOOL })).toEqual(['npx', ABSENT_TOOL]);
  });

  it('should fall back to the bun exec form when no shim exists', () => {
    const root = createProject({ lockfileNames: ['bun.lock'] });
    setPlatform('linux');
    expect(resolveToolCommand({ cwd: root, tool: ABSENT_TOOL })).toEqual(['bun', 'x', ABSENT_TOOL]);
  });

  it('should fall back to the pnpm exec form when no shim exists', () => {
    const root = createProject({ lockfileNames: ['pnpm-lock.yaml'] });
    setPlatform('linux');
    expect(resolveToolCommand({ cwd: root, tool: ABSENT_TOOL })).toEqual(['pnpm', 'exec', ABSENT_TOOL]);
  });

  it('should fall back to the yarn exec form when no shim exists', () => {
    const root = createProject({ lockfileNames: ['yarn.lock'] });
    setPlatform('linux');
    expect(resolveToolCommand({ cwd: root, tool: ABSENT_TOOL })).toEqual(['yarn', 'exec', ABSENT_TOOL]);
  });

  it('should resolve a tool installed in this repo to the shim in this repo', () => {
    const [command, ...rest] = resolveToolCommand({ tool: 'vitest' });
    expect(rest).toEqual([]);
    expect(command).toBe(`${getRootFolder() ?? ''}/node_modules/.bin/vitest${process.platform === 'win32' ? '.cmd' : ''}`);
  });
});

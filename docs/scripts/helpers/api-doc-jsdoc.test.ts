import { Project } from 'ts-morph';
// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import { extractFunctionSignatures } from './api-doc-jsdoc.ts';

function getFunction(fileName: string, code: string): ReturnType<ReturnType<Project['createSourceFile']>['getFunctions']>[number] {
  const sourceFile = new Project({ useInMemoryFileSystem: true }).createSourceFile(fileName, code);
  const function_ = sourceFile.getFunctions()[0];
  if (!function_) {
    throw new Error('No function in the source.');
  }
  return function_;
}

describe('extractFunctionSignatures', () => {
  it('should render an optional parameter as written, without an implicit undefined', () => {
    const [signature] = extractFunctionSignatures(getFunction('a.ts', 'export function f(a: string, b?: string): void {}'), false, false);
    expect(signature?.signature).toBe('f(a: string, b?: string)');
  });

  it('should list the overloads of an implemented function and not its implementation signature', () => {
    const code = '/** By path. */ export function f(a: string): void;\n'
      + '/** By path and source. */ export function f(a: string, b: string): void;\n'
      + '/** Implementation. */ export function f(a: string, b?: string): void {}';
    const signatures = extractFunctionSignatures(getFunction('a.ts', code), false, false);
    expect(signatures.map((s) => s.signature)).toEqual(['f(a: string)', 'f(a: string, b: string)']);
    expect(signatures.map((s) => s.description)).toEqual(['By path.', 'By path and source.']);
  });

  it('should list every declaration of an ambient overloaded function', () => {
    const code = 'export function f(a: string): void;\nexport function f(a: number, b?: boolean): void;';
    const signatures = extractFunctionSignatures(getFunction('a.d.ts', code), false, false);
    expect(signatures.map((s) => s.signature)).toEqual(['f(a: string)', 'f(a: number, b?: boolean)']);
  });

  it('should prefix a static signature', () => {
    const [signature] = extractFunctionSignatures(getFunction('a.d.ts', 'export function f(): void;'), false, true);
    expect(signature?.signature).toBe('static f()');
  });
});

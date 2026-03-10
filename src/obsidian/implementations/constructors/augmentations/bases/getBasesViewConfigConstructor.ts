import {
  BasesViewConfig
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type BasesViewConfigConstructor = ExtractConstructor<BasesViewConfig>;

/**
 * Get the BasesViewConfig constructor.
 *
 * @returns The BasesViewConfig constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesViewConfigConstructor(): BasesViewConfigConstructor {
  return BasesViewConfig as BasesViewConfigConstructor;
}

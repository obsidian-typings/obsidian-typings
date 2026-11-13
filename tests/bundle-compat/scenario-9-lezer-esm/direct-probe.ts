import {
  lineClassNodeProp,
  syntaxTree,
  tokenClassNodeProp
} from '@codemirror/language';
import type { EditorState } from '@codemirror/state';

import 'obsidian-typings';
// Opt into the upstream Lezer and CodeMirror language/search types at Obsidian's boundaries.
import type {} from 'obsidian-typings/lezer';

declare const state: EditorState;
const node = syntaxTree(state).resolveInner(1);
const tokenClass: string | undefined = node.type.prop(tokenClassNodeProp);
const lineClass: string | undefined = node.type.prop(lineClassNodeProp);
void tokenClass;
void lineClass;

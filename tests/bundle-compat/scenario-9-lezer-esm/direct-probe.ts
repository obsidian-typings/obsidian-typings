import {
  lineClassNodeProp,
  syntaxTree,
  tokenClassNodeProp
} from '@codemirror/language';
import type { EditorState } from '@codemirror/state';

import 'obsidian-typings';

declare const state: EditorState;
const node = syntaxTree(state).resolveInner(1);
const tokenClass: string | undefined = node.type.prop(tokenClassNodeProp);
const lineClass: string | undefined = node.type.prop(lineClassNodeProp);
void tokenClass;
void lineClass;

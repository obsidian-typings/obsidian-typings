import {
  lineClassNodeProp,
  tokenClassNodeProp
} from '@codemirror/language';
import type { ParseContext } from '@codemirror/language';
import type { SearchQuery } from '@codemirror/search';
import type { Text } from '@codemirror/state';
import type {
  NodeProp,
  SyntaxNode,
  Tree
} from '@lezer/common';
import type {
  CodeMirrorEditor,
  LanguageState
} from 'obsidian-typings';

import 'obsidian-typings';
// Opt into the upstream Lezer and CodeMirror language/search types at Obsidian's boundaries.
import type {} from 'obsidian-typings/lezer';

// A locally copied NodeProp fails these assignments even when its public members look identical:
// NodeProp.add reaches NodeType, whose upstream private members give it a distinct identity.
const tokenProp: NodeProp<string> = tokenClassNodeProp;
const lineProp: NodeProp<string> = lineClassNodeProp;
declare const syntaxNode: SyntaxNode;
const tokenClass: string | undefined = syntaxNode.type.prop(tokenProp);
const lineClass: string | undefined = syntaxNode.type.prop(lineProp);

// The parser's exposed tree must use the same public Lezer types as the consumer's syntax tree.
declare const languageState: LanguageState;
declare const tree: Tree;
const consumerTree: Tree = languageState.tree;
languageState.tree = tree;

void tokenClass;
void lineClass;
void consumerTree;

// Other public CodeMirror classes must also cross the boundary without local replicas.
const context: ParseContext = languageState.context;
declare const editor: CodeMirrorEditor;
const query: SearchQuery | undefined = editor.addOverlay({ query: /test/ });
declare const text: Text;
query?.getCursor(text);
void context;

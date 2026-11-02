import {
  lineClassNodeProp,
  tokenClassNodeProp
} from '@codemirror/language';
import type {
  NodeProp,
  SyntaxNode,
  Tree
} from '@lezer/common';
import type { LanguageState } from 'obsidian-typings';

import 'obsidian-typings';

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

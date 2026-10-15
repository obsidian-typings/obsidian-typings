import { augmentationMemberTags } from './augmentation-member-tags.ts';
import { constructorGetterPlacement } from './constructor-getter-placement.ts';
import { fileExtension } from './file-extension.ts';
import { importExtensions } from './import-extensions.ts';
import { internalsInterfaceTags } from './internals-interface-tags.ts';
import { jsdocBalancedCodeFences } from './jsdoc-balanced-code-fences.ts';
import { jsdocEmptyLineBeforeTags } from './jsdoc-empty-line-before-tags.ts';
import { noDeclareModuleInInternals } from './no-declare-module-in-internals.ts';
import { noImportAliasInDeclareGlobal } from './no-import-alias-in-declare-global.ts';
import { noInheritDocTag } from './no-inherit-doc-tag.ts';
import { noInterfaceTagsInAugmentations } from './no-interface-tags-in-augmentations.ts';
import { noMemberUnofficialInInternals } from './no-member-unofficial-in-internals.ts';
import { noTodoTag } from './no-todo-tag.ts';
import { oneDeclarationPerFile } from './one-declaration-per-file.ts';
import { requireExportEmptyInAugmentations } from './require-export-empty-in-augmentations.ts';
import { requireMemberDescription } from './require-member-description.ts';
import { requireOptionalUnderscoreMembers } from './require-optional-underscore-members.ts';
import { requireVarInGlobalVars } from './require-var-in-global-vars.ts';
import { toEslintRule } from './utils.ts';
import { visibilityTagsLast } from './visibility-tags-last.ts';
import { windowMemberFileSync } from './window-member-file-sync.ts';

export const obsidianTypingsPlugin = {
  meta: { name: 'obsidian-typings' },
  rules: {
    'augmentation-member-tags': toEslintRule(augmentationMemberTags),
    'constructor-getter-placement': toEslintRule(constructorGetterPlacement),
    'file-extension': toEslintRule(fileExtension),
    'import-extensions': toEslintRule(importExtensions),
    'jsdoc-balanced-code-fences': toEslintRule(jsdocBalancedCodeFences),
    'jsdoc-empty-line-before-tags': toEslintRule(jsdocEmptyLineBeforeTags),
    'internals-interface-tags': toEslintRule(internalsInterfaceTags),
    'no-declare-module-in-internals': toEslintRule(noDeclareModuleInInternals),
    'no-inherit-doc-tag': toEslintRule(noInheritDocTag),
    'no-import-alias-in-declare-global': toEslintRule(noImportAliasInDeclareGlobal),
    'no-interface-tags-in-augmentations': toEslintRule(noInterfaceTagsInAugmentations),
    'no-member-unofficial-in-internals': toEslintRule(noMemberUnofficialInInternals),
    'no-todo-tag': toEslintRule(noTodoTag),
    'one-declaration-per-file': toEslintRule(oneDeclarationPerFile),
    'require-export-empty-in-augmentations': toEslintRule(requireExportEmptyInAugmentations),
    'require-member-description': toEslintRule(requireMemberDescription),
    'require-optional-underscore-members': toEslintRule(requireOptionalUnderscoreMembers),
    'require-var-in-global-vars': toEslintRule(requireVarInGlobalVars),
    'visibility-tags-last': toEslintRule(visibilityTagsLast),
    'window-member-file-sync': toEslintRule(windowMemberFileSync)
  }
};

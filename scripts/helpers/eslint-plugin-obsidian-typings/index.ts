import { augmentationMemberTags } from './augmentation-member-tags.ts';
import { constructorGetterPlacement } from './constructor-getter-placement.ts';
import { fileExtension } from './file-extension.ts';
import { importExtensions } from './import-extensions.ts';
import { internalsInterfaceTags } from './internals-interface-tags.ts';
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
import { visibilityTagsLast } from './visibility-tags-last.ts';
import { windowMemberFileSync } from './window-member-file-sync.ts';

export const obsidianTypingsPlugin = {
  meta: { name: 'obsidian-typings' },
  rules: {
    'augmentation-member-tags': augmentationMemberTags,
    'constructor-getter-placement': constructorGetterPlacement,
    'file-extension': fileExtension,
    'import-extensions': importExtensions,
    'jsdoc-empty-line-before-tags': jsdocEmptyLineBeforeTags,
    'internals-interface-tags': internalsInterfaceTags,
    'no-declare-module-in-internals': noDeclareModuleInInternals,
    'no-inherit-doc-tag': noInheritDocTag,
    'no-import-alias-in-declare-global': noImportAliasInDeclareGlobal,
    'no-interface-tags-in-augmentations': noInterfaceTagsInAugmentations,
    'no-member-unofficial-in-internals': noMemberUnofficialInInternals,
    'no-todo-tag': noTodoTag,
    'one-declaration-per-file': oneDeclarationPerFile,
    'require-export-empty-in-augmentations': requireExportEmptyInAugmentations,
    'require-member-description': requireMemberDescription,
    'require-optional-underscore-members': requireOptionalUnderscoreMembers,
    'require-var-in-global-vars': requireVarInGlobalVars,
    'visibility-tags-last': visibilityTagsLast,
    'window-member-file-sync': windowMemberFileSync
  }
};

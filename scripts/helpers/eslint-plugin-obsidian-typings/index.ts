import { augmentationMemberTags } from './augmentation-member-tags.ts';
import { constructorBaseRestricted } from './constructor-base-restricted.ts';
import { constructorGetterPlacement } from './constructor-getter-placement.ts';
import { fileExtension } from './file-extension.ts';
import { importExtensions } from './import-extensions.ts';
import { internalsInterfaceTags } from './internals-interface-tags.ts';
import { noDeclareModuleInInternals } from './no-declare-module-in-internals.ts';
import { noImportAliasInDeclareGlobal } from './no-import-alias-in-declare-global.ts';
import { noInterfaceTagsInAugmentations } from './no-interface-tags-in-augmentations.ts';
import { noMemberUnofficialInInternals } from './no-member-unofficial-in-internals.ts';
import { oneExportPerFile } from './one-export-per-file.ts';
import { requireExportEmptyInAugmentations } from './require-export-empty-in-augmentations.ts';
import { windowMemberFileSync } from './window-member-file-sync.ts';

export const obsidianTypingsPlugin = {
  meta: { name: 'obsidian-typings' },
  rules: {
    'augmentation-member-tags': augmentationMemberTags,
    'constructor-base-restricted': constructorBaseRestricted,
    'constructor-getter-placement': constructorGetterPlacement,
    'file-extension': fileExtension,
    'import-extensions': importExtensions,
    'internals-interface-tags': internalsInterfaceTags,
    'no-declare-module-in-internals': noDeclareModuleInInternals,
    'no-import-alias-in-declare-global': noImportAliasInDeclareGlobal,
    'no-interface-tags-in-augmentations': noInterfaceTagsInAugmentations,
    'no-member-unofficial-in-internals': noMemberUnofficialInInternals,
    'one-export-per-file': oneExportPerFile,
    'require-export-empty-in-augmentations': requireExportEmptyInAugmentations,
    'window-member-file-sync': windowMemberFileSync
  }
};

/**
 * Scenario 19: the optional `id` on a setting definition, a group, a list and a page.
 *
 * Obsidian 1.14.0 and later key a rendered setting by its `id` before its control key or name, and
 * 1.15.0 and later build a page's navigation path from `id ?? name`. The `obsidian` package
 * declares neither until obsidianmd/obsidian-api#185 is released, so an object literal carrying
 * `id` failed with `TS2353` (obsidian-typings/obsidian-typings#151).
 *
 * Each `@ts-expect-error` asserts that `id` stays a string.
 */

import type {
  SettingDefinitionBase,
  SettingDefinitionGroup,
  SettingDefinitionItem,
  SettingDefinitionList,
  SettingDefinitionPage
} from 'obsidian';

import 'obsidian-typings';

// === The report's shape: a page returned from `getSettingDefinitions()` ===
function getSettingDefinitions(): SettingDefinitionItem[] {
  return [
    {
      id: 'default_value',
      items: [
        {
          id: 'general',
          items: [
            { desc: 'Shown under the heading.', id: 'intro', name: 'Introduction' }
          ],
          type: 'group'
        }
      ],
      name: 'Default value',
      type: 'page'
    },
    {
      id: 'entries',
      type: 'list'
    }
  ];
}
void getSettingDefinitions;

// === Each declaring interface reads it back as an optional string ===
declare const base: SettingDefinitionBase;
declare const group: SettingDefinitionGroup;
declare const list: SettingDefinitionList;
declare const page: SettingDefinitionPage;

const _baseId: string | undefined = base.id;
const _groupId: string | undefined = group.id;
const _listId: string | undefined = list.id;
const _pageId: string | undefined = page.id;
void _baseId;
void _groupId;
void _listId;
void _pageId;

// @ts-expect-error -- `id` is a string, not a number.
const _numericPage: SettingDefinitionPage = { id: 1, name: 'Numeric', type: 'page' };
void _numericPage;

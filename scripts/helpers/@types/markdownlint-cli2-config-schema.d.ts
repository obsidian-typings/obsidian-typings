import { Rule } from 'markdownlint';

/**
 * Markdownlint-cli2 configuration schema : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/schema/markdownlint-cli2-config-schema.json
 */
export interface MarkdownlintCli2ConfigurationSchema {
  /**
   * JSON Schema URI (expected by some editors)
   */
  $schema?: string;
  /**
   * Markdownlint configuration schema : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/schema/.markdownlint.jsonc
   */
  config?: MarkdownlintConfigurationSchema;
  /**
   * Module names or paths of custom rules to load and use when linting : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  customRules?: (Rule | string)[];
  /**
   * Whether to enable fixing of linting errors reported by rules that emit fix information : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  fix?: boolean;
  /**
   * Regular expression used to match and ignore any front matter at the beginning of a document : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  frontMatter?: string;
  /**
   * Whether to ignore files referenced by .gitignore (or glob expression) (only valid at the root) : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  gitignore?: boolean | string;
  /**
   * Glob expressions to include when linting (only valid at the root) : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  globs?: string[];
  /**
   * Glob expressions to ignore when linting : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  ignores?: string[];
  /**
   * Markdown-it plugins to load and use when linting : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  markdownItPlugins?:
    | [
      string,
      Record<string, unknown>
    ][]
    | [string];
  /**
   * Additional paths to resolve module locations from : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  modulePaths?: string[];
  /**
   * Whether to disable the display of the banner message and version numbers on stdout (only valid at the root) : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  noBanner?: boolean;
  /**
   * Whether to disable support of HTML comments within Markdown content : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  noInlineConfig?: boolean;
  /**
   * Whether to disable the display of progress on stdout (only valid at the root) : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  noProgress?: boolean;
  /**
   * Output formatters to load and use to customize markdownlint-cli2 output (only valid at the root) : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  outputFormatters?:
    | [
      string,
      Record<string, unknown>
    ][]
    | [string];
  /**
   * Whether to show the list of found files on stdout (only valid at the root) : https://github.com/DavidAnson/markdownlint-cli2/blob/v0.18.1/README.md#markdownlint-cli2jsonc
   */
  showFound?: boolean;
}
/**
 * Markdownlint configuration schema : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/schema/.markdownlint.jsonc
 */
export interface MarkdownlintConfigurationSchema {
  [k: string]: unknown;
  /**
   * JSON Schema URI (expected by some editors)
   */
  '$schema'?: string;
  /**
   * Accessibility : MD045, MD059
   */
  'accessibility'?: boolean;
  /**
   * Atx : MD018, MD019
   */
  'atx'?: boolean;
  /**
   * Atx_closed : MD020, MD021
   */
  'atx_closed'?: boolean;
  /**
   * Blank_lines : MD012, MD022, MD031, MD032, MD047
   */
  'blank_lines'?: boolean;
  /**
   * MD031/blanks-around-fences : Fenced code blocks should be surrounded by blank lines : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md031.md
   */
  'blanks-around-fences'?:
    | {
      /**
       * Include list items
       */
      list_items?: boolean;
    }
    | boolean;
  /**
   * MD022/blanks-around-headings : Headings should be surrounded by blank lines : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md022.md
   */
  'blanks-around-headings'?:
    | {
      /**
       * Blank lines above heading
       */
      lines_above?: number | number[];
      /**
       * Blank lines below heading
       */
      lines_below?: number | number[];
    }
    | boolean;
  /**
   * MD032/blanks-around-lists : Lists should be surrounded by blank lines : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md032.md
   */
  'blanks-around-lists'?: boolean;
  /**
   * MD058/blanks-around-tables : Tables should be surrounded by blank lines : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md058.md
   */
  'blanks-around-tables'?: boolean;
  /**
   * Blockquote : MD027, MD028
   */
  'blockquote'?: boolean;
  /**
   * Bullet : MD004, MD005, MD007, MD032
   */
  'bullet'?: boolean;
  /**
   * Code : MD014, MD031, MD038, MD040, MD046, MD048
   */
  'code'?: boolean;
  /**
   * MD046/code-block-style : Code block style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md046.md
   */
  'code-block-style'?:
    | {
      /**
       * Block style
       */
      style?: 'consistent' | 'fenced' | 'indented';
    }
    | boolean;
  /**
   * MD048/code-fence-style : Code fence style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md048.md
   */
  'code-fence-style'?:
    | {
      /**
       * Code fence style
       */
      style?: 'backtick' | 'consistent' | 'tilde';
    }
    | boolean;
  /**
   * MD014/commands-show-output : Dollar signs used before commands without showing output : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md014.md
   */
  'commands-show-output'?: boolean;
  /**
   * Default state for all rules
   */
  'default'?: boolean;
  /**
   * MD059/descriptive-link-text : Link text should be descriptive : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md059.md
   */
  'descriptive-link-text'?:
    | {
      /**
       * Prohibited link texts
       */
      prohibited_texts?: string[];
    }
    | boolean;
  /**
   * Emphasis : MD036, MD037, MD049, MD050
   */
  'emphasis'?: boolean;
  /**
   * MD049/emphasis-style : Emphasis style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md049.md
   */
  'emphasis-style'?:
    | {
      /**
       * Emphasis style
       */
      style?: 'asterisk' | 'consistent' | 'underscore';
    }
    | boolean;
  /**
   * Path to configuration file to extend
   */
  'extends'?: null | string;
  /**
   * MD040/fenced-code-language : Fenced code blocks should have a language specified : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md040.md
   */
  'fenced-code-language'?:
    | {
      /**
       * List of languages
       */
      allowed_languages?: string[];
      /**
       * Require language only
       */
      language_only?: boolean;
    }
    | boolean;
  /**
   * MD041/first-line-heading/first-line-h1 : First line in a file should be a top-level heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md041.md
   */
  'first-line-h1'?:
    | {
      /**
       * Allow content before first heading
       */
      allow_preamble?: boolean;
      /**
       * RegExp for matching title in front matter
       */
      front_matter_title?: string;
      /**
       * Heading level
       */
      level?: number;
    }
    | boolean;
  /**
   * MD041/first-line-heading/first-line-h1 : First line in a file should be a top-level heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md041.md
   */
  'first-line-heading'?:
    | {
      /**
       * Allow content before first heading
       */
      allow_preamble?: boolean;
      /**
       * RegExp for matching title in front matter
       */
      front_matter_title?: string;
      /**
       * Heading level
       */
      level?: number;
    }
    | boolean;
  /**
   * Hard_tab : MD010
   */
  'hard_tab'?: boolean;
  /**
   * MD001/heading-increment : Heading levels should only increment by one level at a time : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md001.md
   */
  'heading-increment'?: boolean;
  /**
   * MD023/heading-start-left : Headings must start at the beginning of the line : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md023.md
   */
  'heading-start-left'?: boolean;
  /**
   * MD003/heading-style : Heading style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md003.md
   */
  'heading-style'?:
    | {
      /**
       * Heading style
       */
      style?: 'atx_closed' | 'atx' | 'consistent' | 'setext_with_atx_closed' | 'setext_with_atx' | 'setext';
    }
    | boolean;
  /**
   * Headings : MD001, MD003, MD018, MD019, MD020, MD021, MD022, MD023, MD024, MD025, MD026, MD036, MD041, MD043
   */
  'headings'?: boolean;
  /**
   * Hr : MD035
   */
  'hr'?: boolean;
  /**
   * MD035/hr-style : Horizontal rule style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md035.md
   */
  'hr-style'?:
    | {
      /**
       * Horizontal rule style
       */
      style?: string;
    }
    | boolean;
  /**
   * Html : MD033
   */
  'html'?: boolean;
  /**
   * Images : MD045, MD052, MD053, MD054
   */
  'images'?: boolean;
  /**
   * Indentation : MD005, MD007, MD027
   */
  'indentation'?: boolean;
  /**
   * Language : MD040
   */
  'language'?: boolean;
  /**
   * Line_length : MD013
   */
  'line_length'?: boolean;
  /**
   * MD013/line-length : Line length : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md013.md
   */
  'line-length'?:
    | {
      /**
       * Number of characters for code blocks
       */
      code_block_line_length?: number;
      /**
       * Include code blocks
       */
      code_blocks?: boolean;
      /**
       * Number of characters for headings
       */
      heading_line_length?: number;
      /**
       * Include headings
       */
      headings?: boolean;
      /**
       * Number of characters
       */
      line_length?: number;
      /**
       * Stern length checking
       */
      stern?: boolean;
      /**
       * Strict length checking
       */
      strict?: boolean;
      /**
       * Include tables
       */
      tables?: boolean;
    }
    | boolean;
  /**
   * MD051/link-fragments : Link fragments should be valid : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md051.md
   */
  'link-fragments'?:
    | {
      /**
       * Ignore case of fragments
       */
      ignore_case?: boolean;
      /**
       * Pattern for ignoring additional fragments
       */
      ignored_pattern?: string;
    }
    | boolean;
  /**
   * MD053/link-image-reference-definitions : Link and image reference definitions should be needed : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md053.md
   */
  'link-image-reference-definitions'?:
    | {
      /**
       * Ignored definitions
       */
      ignored_definitions?: string[];
    }
    | boolean;
  /**
   * MD054/link-image-style : Link and image style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md054.md
   */
  'link-image-style'?:
    | {
      /**
       * Allow autolinks
       */
      autolink?: boolean;
      /**
       * Allow collapsed reference links and images
       */
      collapsed?: boolean;
      /**
       * Allow full reference links and images
       */
      full?: boolean;
      /**
       * Allow inline links and images
       */
      inline?: boolean;
      /**
       * Allow shortcut reference links and images
       */
      shortcut?: boolean;
      /**
       * Allow URLs as inline links
       */
      url_inline?: boolean;
    }
    | boolean;
  /**
   * Links : MD011, MD034, MD039, MD042, MD051, MD052, MD053, MD054, MD059
   */
  'links'?: boolean;
  /**
   * MD005/list-indent : Inconsistent indentation for list items at the same level : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md005.md
   */
  'list-indent'?: boolean;
  /**
   * MD030/list-marker-space : Spaces after list markers : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md030.md
   */
  'list-marker-space'?:
    | {
      /**
       * Spaces for multi-line ordered list items
       */
      ol_multi?: number;
      /**
       * Spaces for single-line ordered list items
       */
      ol_single?: number;
      /**
       * Spaces for multi-line unordered list items
       */
      ul_multi?: number;
      /**
       * Spaces for single-line unordered list items
       */
      ul_single?: number;
    }
    | boolean;
  /**
   * MD001/heading-increment : Heading levels should only increment by one level at a time : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md001.md
   */
  'MD001'?: boolean;
  /**
   * MD003/heading-style : Heading style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md003.md
   */
  'MD003'?:
    | {
      /**
       * Heading style
       */
      style?: 'atx_closed' | 'atx' | 'consistent' | 'setext_with_atx_closed' | 'setext_with_atx' | 'setext';
    }
    | boolean;
  /**
   * MD004/ul-style : Unordered list style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md004.md
   */
  'MD004'?:
    | {
      /**
       * List style
       */
      style?: 'asterisk' | 'consistent' | 'dash' | 'plus' | 'sublist';
    }
    | boolean;
  /**
   * MD005/list-indent : Inconsistent indentation for list items at the same level : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md005.md
   */
  'MD005'?: boolean;
  /**
   * MD007/ul-indent : Unordered list indentation : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md007.md
   */
  'MD007'?:
    | {
      /**
       * Spaces for indent
       */
      indent?: number;
      /**
       * Spaces for first level indent (when start_indented is set)
       */
      start_indent?: number;
      /**
       * Whether to indent the first level of the list
       */
      start_indented?: boolean;
    }
    | boolean;
  /**
   * MD009/no-trailing-spaces : Trailing spaces : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md009.md
   */
  'MD009'?:
    | {
      /**
       * Spaces for line break
       */
      br_spaces?: number;
      /**
       * Allow spaces for empty lines in list items
       */
      list_item_empty_lines?: boolean;
      /**
       * Include unnecessary breaks
       */
      strict?: boolean;
    }
    | boolean;
  /**
   * MD010/no-hard-tabs : Hard tabs : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md010.md
   */
  'MD010'?:
    | {
      /**
       * Include code blocks
       */
      code_blocks?: boolean;
      /**
       * Fenced code languages to ignore
       */
      ignore_code_languages?: string[];
      /**
       * Number of spaces for each hard tab
       */
      spaces_per_tab?: number;
    }
    | boolean;
  /**
   * MD011/no-reversed-links : Reversed link syntax : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md011.md
   */
  'MD011'?: boolean;
  /**
   * MD012/no-multiple-blanks : Multiple consecutive blank lines : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md012.md
   */
  'MD012'?:
    | {
      /**
       * Consecutive blank lines
       */
      maximum?: number;
    }
    | boolean;
  /**
   * MD013/line-length : Line length : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md013.md
   */
  'MD013'?:
    | {
      /**
       * Number of characters for code blocks
       */
      code_block_line_length?: number;
      /**
       * Include code blocks
       */
      code_blocks?: boolean;
      /**
       * Number of characters for headings
       */
      heading_line_length?: number;
      /**
       * Include headings
       */
      headings?: boolean;
      /**
       * Number of characters
       */
      line_length?: number;
      /**
       * Stern length checking
       */
      stern?: boolean;
      /**
       * Strict length checking
       */
      strict?: boolean;
      /**
       * Include tables
       */
      tables?: boolean;
    }
    | boolean;
  /**
   * MD014/commands-show-output : Dollar signs used before commands without showing output : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md014.md
   */
  'MD014'?: boolean;
  /**
   * MD018/no-missing-space-atx : No space after hash on atx style heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md018.md
   */
  'MD018'?: boolean;
  /**
   * MD019/no-multiple-space-atx : Multiple spaces after hash on atx style heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md019.md
   */
  'MD019'?: boolean;
  /**
   * MD020/no-missing-space-closed-atx : No space inside hashes on closed atx style heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md020.md
   */
  'MD020'?: boolean;
  /**
   * MD021/no-multiple-space-closed-atx : Multiple spaces inside hashes on closed atx style heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md021.md
   */
  'MD021'?: boolean;
  /**
   * MD022/blanks-around-headings : Headings should be surrounded by blank lines : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md022.md
   */
  'MD022'?:
    | {
      /**
       * Blank lines above heading
       */
      lines_above?: number | number[];
      /**
       * Blank lines below heading
       */
      lines_below?: number | number[];
    }
    | boolean;
  /**
   * MD023/heading-start-left : Headings must start at the beginning of the line : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md023.md
   */
  'MD023'?: boolean;
  /**
   * MD024/no-duplicate-heading : Multiple headings with the same content : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md024.md
   */
  'MD024'?:
    | {
      /**
       * Only check sibling headings
       */
      siblings_only?: boolean;
    }
    | boolean;
  /**
   * MD025/single-title/single-h1 : Multiple top-level headings in the same document : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md025.md
   */
  'MD025'?:
    | {
      /**
       * RegExp for matching title in front matter
       */
      front_matter_title?: string;
      /**
       * Heading level
       */
      level?: number;
    }
    | boolean;
  /**
   * MD026/no-trailing-punctuation : Trailing punctuation in heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md026.md
   */
  'MD026'?:
    | {
      /**
       * Punctuation characters
       */
      punctuation?: string;
    }
    | boolean;
  /**
   * MD027/no-multiple-space-blockquote : Multiple spaces after blockquote symbol : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md027.md
   */
  'MD027'?:
    | {
      /**
       * Include list items
       */
      list_items?: boolean;
    }
    | boolean;
  /**
   * MD028/no-blanks-blockquote : Blank line inside blockquote : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md028.md
   */
  'MD028'?: boolean;
  /**
   * MD029/ol-prefix : Ordered list item prefix : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md029.md
   */
  'MD029'?:
    | {
      /**
       * List style
       */
      style?: 'one_or_ordered' | 'one' | 'ordered' | 'zero';
    }
    | boolean;
  /**
   * MD030/list-marker-space : Spaces after list markers : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md030.md
   */
  'MD030'?:
    | {
      /**
       * Spaces for multi-line ordered list items
       */
      ol_multi?: number;
      /**
       * Spaces for single-line ordered list items
       */
      ol_single?: number;
      /**
       * Spaces for multi-line unordered list items
       */
      ul_multi?: number;
      /**
       * Spaces for single-line unordered list items
       */
      ul_single?: number;
    }
    | boolean;
  /**
   * MD031/blanks-around-fences : Fenced code blocks should be surrounded by blank lines : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md031.md
   */
  'MD031'?:
    | {
      /**
       * Include list items
       */
      list_items?: boolean;
    }
    | boolean;
  /**
   * MD032/blanks-around-lists : Lists should be surrounded by blank lines : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md032.md
   */
  'MD032'?: boolean;
  /**
   * MD033/no-inline-html : Inline HTML : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md033.md
   */
  'MD033'?:
    | {
      /**
       * Allowed elements
       */
      allowed_elements?: string[];
    }
    | boolean;
  /**
   * MD034/no-bare-urls : Bare URL used : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md034.md
   */
  'MD034'?: boolean;
  /**
   * MD035/hr-style : Horizontal rule style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md035.md
   */
  'MD035'?:
    | {
      /**
       * Horizontal rule style
       */
      style?: string;
    }
    | boolean;
  /**
   * MD036/no-emphasis-as-heading : Emphasis used instead of a heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md036.md
   */
  'MD036'?:
    | {
      /**
       * Punctuation characters
       */
      punctuation?: string;
    }
    | boolean;
  /**
   * MD037/no-space-in-emphasis : Spaces inside emphasis markers : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md037.md
   */
  'MD037'?: boolean;
  /**
   * MD038/no-space-in-code : Spaces inside code span elements : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md038.md
   */
  'MD038'?: boolean;
  /**
   * MD039/no-space-in-links : Spaces inside link text : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md039.md
   */
  'MD039'?: boolean;
  /**
   * MD040/fenced-code-language : Fenced code blocks should have a language specified : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md040.md
   */
  'MD040'?:
    | {
      /**
       * List of languages
       */
      allowed_languages?: string[];
      /**
       * Require language only
       */
      language_only?: boolean;
    }
    | boolean;
  /**
   * MD041/first-line-heading/first-line-h1 : First line in a file should be a top-level heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md041.md
   */
  'MD041'?:
    | {
      /**
       * Allow content before first heading
       */
      allow_preamble?: boolean;
      /**
       * RegExp for matching title in front matter
       */
      front_matter_title?: string;
      /**
       * Heading level
       */
      level?: number;
    }
    | boolean;
  /**
   * MD042/no-empty-links : No empty links : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md042.md
   */
  'MD042'?: boolean;
  /**
   * MD043/required-headings : Required heading structure : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md043.md
   */
  'MD043'?:
    | {
      /**
       * List of headings
       */
      headings?: string[];
      /**
       * Match case of headings
       */
      match_case?: boolean;
    }
    | boolean;
  /**
   * MD044/proper-names : Proper names should have the correct capitalization : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md044.md
   */
  'MD044'?:
    | {
      /**
       * Include code blocks
       */
      code_blocks?: boolean;
      /**
       * Include HTML elements
       */
      html_elements?: boolean;
      /**
       * List of proper names
       */
      names?: string[];
    }
    | boolean;
  /**
   * MD045/no-alt-text : Images should have alternate text (alt text) : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md045.md
   */
  'MD045'?: boolean;
  /**
   * MD046/code-block-style : Code block style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md046.md
   */
  'MD046'?:
    | {
      /**
       * Block style
       */
      style?: 'consistent' | 'fenced' | 'indented';
    }
    | boolean;
  /**
   * MD047/single-trailing-newline : Files should end with a single newline character : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md047.md
   */
  'MD047'?: boolean;
  /**
   * MD048/code-fence-style : Code fence style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md048.md
   */
  'MD048'?:
    | {
      /**
       * Code fence style
       */
      style?: 'backtick' | 'consistent' | 'tilde';
    }
    | boolean;
  /**
   * MD049/emphasis-style : Emphasis style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md049.md
   */
  'MD049'?:
    | {
      /**
       * Emphasis style
       */
      style?: 'asterisk' | 'consistent' | 'underscore';
    }
    | boolean;
  /**
   * MD050/strong-style : Strong style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md050.md
   */
  'MD050'?:
    | {
      /**
       * Strong style
       */
      style?: 'asterisk' | 'consistent' | 'underscore';
    }
    | boolean;
  /**
   * MD051/link-fragments : Link fragments should be valid : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md051.md
   */
  'MD051'?:
    | {
      /**
       * Ignore case of fragments
       */
      ignore_case?: boolean;
      /**
       * Pattern for ignoring additional fragments
       */
      ignored_pattern?: string;
    }
    | boolean;
  /**
   * MD052/reference-links-images : Reference links and images should use a label that is defined : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md052.md
   */
  'MD052'?:
    | {
      /**
       * Ignored link labels
       */
      ignored_labels?: string[];
      /**
       * Include shortcut syntax
       */
      shortcut_syntax?: boolean;
    }
    | boolean;
  /**
   * MD053/link-image-reference-definitions : Link and image reference definitions should be needed : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md053.md
   */
  'MD053'?:
    | {
      /**
       * Ignored definitions
       */
      ignored_definitions?: string[];
    }
    | boolean;
  /**
   * MD054/link-image-style : Link and image style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md054.md
   */
  'MD054'?:
    | {
      /**
       * Allow autolinks
       */
      autolink?: boolean;
      /**
       * Allow collapsed reference links and images
       */
      collapsed?: boolean;
      /**
       * Allow full reference links and images
       */
      full?: boolean;
      /**
       * Allow inline links and images
       */
      inline?: boolean;
      /**
       * Allow shortcut reference links and images
       */
      shortcut?: boolean;
      /**
       * Allow URLs as inline links
       */
      url_inline?: boolean;
    }
    | boolean;
  /**
   * MD055/table-pipe-style : Table pipe style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md055.md
   */
  'MD055'?:
    | {
      /**
       * Table pipe style
       */
      style?: 'consistent' | 'leading_and_trailing' | 'leading_only' | 'no_leading_or_trailing' | 'trailing_only';
    }
    | boolean;
  /**
   * MD056/table-column-count : Table column count : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md056.md
   */
  'MD056'?: boolean;
  /**
   * MD058/blanks-around-tables : Tables should be surrounded by blank lines : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md058.md
   */
  'MD058'?: boolean;
  /**
   * MD059/descriptive-link-text : Link text should be descriptive : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md059.md
   */
  'MD059'?:
    | {
      /**
       * Prohibited link texts
       */
      prohibited_texts?: string[];
    }
    | boolean;
  /**
   * MD045/no-alt-text : Images should have alternate text (alt text) : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md045.md
   */
  'no-alt-text'?: boolean;
  /**
   * MD034/no-bare-urls : Bare URL used : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md034.md
   */
  'no-bare-urls'?: boolean;
  /**
   * MD028/no-blanks-blockquote : Blank line inside blockquote : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md028.md
   */
  'no-blanks-blockquote'?: boolean;
  /**
   * MD024/no-duplicate-heading : Multiple headings with the same content : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md024.md
   */
  'no-duplicate-heading'?:
    | {
      /**
       * Only check sibling headings
       */
      siblings_only?: boolean;
    }
    | boolean;
  /**
   * MD036/no-emphasis-as-heading : Emphasis used instead of a heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md036.md
   */
  'no-emphasis-as-heading'?:
    | {
      /**
       * Punctuation characters
       */
      punctuation?: string;
    }
    | boolean;
  /**
   * MD042/no-empty-links : No empty links : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md042.md
   */
  'no-empty-links'?: boolean;
  /**
   * MD010/no-hard-tabs : Hard tabs : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md010.md
   */
  'no-hard-tabs'?:
    | {
      /**
       * Include code blocks
       */
      code_blocks?: boolean;
      /**
       * Fenced code languages to ignore
       */
      ignore_code_languages?: string[];
      /**
       * Number of spaces for each hard tab
       */
      spaces_per_tab?: number;
    }
    | boolean;
  /**
   * MD033/no-inline-html : Inline HTML : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md033.md
   */
  'no-inline-html'?:
    | {
      /**
       * Allowed elements
       */
      allowed_elements?: string[];
    }
    | boolean;
  /**
   * MD018/no-missing-space-atx : No space after hash on atx style heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md018.md
   */
  'no-missing-space-atx'?: boolean;
  /**
   * MD020/no-missing-space-closed-atx : No space inside hashes on closed atx style heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md020.md
   */
  'no-missing-space-closed-atx'?: boolean;
  /**
   * MD012/no-multiple-blanks : Multiple consecutive blank lines : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md012.md
   */
  'no-multiple-blanks'?:
    | {
      /**
       * Consecutive blank lines
       */
      maximum?: number;
    }
    | boolean;
  /**
   * MD019/no-multiple-space-atx : Multiple spaces after hash on atx style heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md019.md
   */
  'no-multiple-space-atx'?: boolean;
  /**
   * MD027/no-multiple-space-blockquote : Multiple spaces after blockquote symbol : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md027.md
   */
  'no-multiple-space-blockquote'?:
    | {
      /**
       * Include list items
       */
      list_items?: boolean;
    }
    | boolean;
  /**
   * MD021/no-multiple-space-closed-atx : Multiple spaces inside hashes on closed atx style heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md021.md
   */
  'no-multiple-space-closed-atx'?: boolean;
  /**
   * MD011/no-reversed-links : Reversed link syntax : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md011.md
   */
  'no-reversed-links'?: boolean;
  /**
   * MD038/no-space-in-code : Spaces inside code span elements : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md038.md
   */
  'no-space-in-code'?: boolean;
  /**
   * MD037/no-space-in-emphasis : Spaces inside emphasis markers : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md037.md
   */
  'no-space-in-emphasis'?: boolean;
  /**
   * MD039/no-space-in-links : Spaces inside link text : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md039.md
   */
  'no-space-in-links'?: boolean;
  /**
   * MD026/no-trailing-punctuation : Trailing punctuation in heading : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md026.md
   */
  'no-trailing-punctuation'?:
    | {
      /**
       * Punctuation characters
       */
      punctuation?: string;
    }
    | boolean;
  /**
   * MD009/no-trailing-spaces : Trailing spaces : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md009.md
   */
  'no-trailing-spaces'?:
    | {
      /**
       * Spaces for line break
       */
      br_spaces?: number;
      /**
       * Allow spaces for empty lines in list items
       */
      list_item_empty_lines?: boolean;
      /**
       * Include unnecessary breaks
       */
      strict?: boolean;
    }
    | boolean;
  /**
   * Ol : MD029, MD030, MD032
   */
  'ol'?: boolean;
  /**
   * MD029/ol-prefix : Ordered list item prefix : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md029.md
   */
  'ol-prefix'?:
    | {
      /**
       * List style
       */
      style?: 'one_or_ordered' | 'one' | 'ordered' | 'zero';
    }
    | boolean;
  /**
   * MD044/proper-names : Proper names should have the correct capitalization : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md044.md
   */
  'proper-names'?:
    | {
      /**
       * Include code blocks
       */
      code_blocks?: boolean;
      /**
       * Include HTML elements
       */
      html_elements?: boolean;
      /**
       * List of proper names
       */
      names?: string[];
    }
    | boolean;
  /**
   * MD052/reference-links-images : Reference links and images should use a label that is defined : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md052.md
   */
  'reference-links-images'?:
    | {
      /**
       * Ignored link labels
       */
      ignored_labels?: string[];
      /**
       * Include shortcut syntax
       */
      shortcut_syntax?: boolean;
    }
    | boolean;
  /**
   * MD043/required-headings : Required heading structure : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md043.md
   */
  'required-headings'?:
    | {
      /**
       * List of headings
       */
      headings?: string[];
      /**
       * Match case of headings
       */
      match_case?: boolean;
    }
    | boolean;
  /**
   * MD025/single-title/single-h1 : Multiple top-level headings in the same document : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md025.md
   */
  'single-h1'?:
    | {
      /**
       * RegExp for matching title in front matter
       */
      front_matter_title?: string;
      /**
       * Heading level
       */
      level?: number;
    }
    | boolean;
  /**
   * MD025/single-title/single-h1 : Multiple top-level headings in the same document : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md025.md
   */
  'single-title'?:
    | {
      /**
       * RegExp for matching title in front matter
       */
      front_matter_title?: string;
      /**
       * Heading level
       */
      level?: number;
    }
    | boolean;
  /**
   * MD047/single-trailing-newline : Files should end with a single newline character : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md047.md
   */
  'single-trailing-newline'?: boolean;
  /**
   * Spaces : MD018, MD019, MD020, MD021, MD023
   */
  'spaces'?: boolean;
  /**
   * Spelling : MD044
   */
  'spelling'?: boolean;
  /**
   * MD050/strong-style : Strong style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md050.md
   */
  'strong-style'?:
    | {
      /**
       * Strong style
       */
      style?: 'asterisk' | 'consistent' | 'underscore';
    }
    | boolean;
  /**
   * Table : MD055, MD056, MD058
   */
  'table'?: boolean;
  /**
   * MD056/table-column-count : Table column count : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md056.md
   */
  'table-column-count'?: boolean;
  /**
   * MD055/table-pipe-style : Table pipe style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md055.md
   */
  'table-pipe-style'?:
    | {
      /**
       * Table pipe style
       */
      style?: 'consistent' | 'leading_and_trailing' | 'leading_only' | 'no_leading_or_trailing' | 'trailing_only';
    }
    | boolean;
  /**
   * Ul : MD004, MD005, MD007, MD030, MD032
   */
  'ul'?: boolean;
  /**
   * MD007/ul-indent : Unordered list indentation : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md007.md
   */
  'ul-indent'?:
    | {
      /**
       * Spaces for indent
       */
      indent?: number;
      /**
       * Spaces for first level indent (when start_indented is set)
       */
      start_indent?: number;
      /**
       * Whether to indent the first level of the list
       */
      start_indented?: boolean;
    }
    | boolean;
  /**
   * MD004/ul-style : Unordered list style : https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md004.md
   */
  'ul-style'?:
    | {
      /**
       * List style
       */
      style?: 'asterisk' | 'consistent' | 'dash' | 'plus' | 'sublist';
    }
    | boolean;
  /**
   * Url : MD034
   */
  'url'?: boolean;
  /**
   * Whitespace : MD009, MD010, MD012, MD027, MD028, MD030, MD037, MD038, MD039
   */
  'whitespace'?: boolean;
}

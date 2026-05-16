import type { Linter } from 'eslint';

import commentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs';
import { includeIgnoreFile } from '@eslint/config-helpers';
import eslint from '@eslint/js';
// eslint-disable-next-line import-x/no-rename-default -- The default export name `plugin` is too confusing.
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { flatConfigs as eslintPluginImportXFlatConfigs } from 'eslint-plugin-import-x';
import { configs as perfectionistConfigs } from 'eslint-plugin-perfectionist';
import { defineConfig } from 'eslint/config';
import { existsSync } from 'node:fs';
import { join } from 'node:path/posix';
// eslint-disable-next-line import-x/no-rename-default -- The default export name `_default` is too confusing.
import tseslint from 'typescript-eslint';

import { localPlugin } from '../helpers/eslint/local-plugin.ts';
import { getRootFolder } from '../helpers/exec.ts';

const typeScriptFiles = [
  'src/**/*.ts',
  'scripts/**/*.ts'
];

export const config: Linter.Config[] = defineConfig(
  ...getGitignoreConfigs(),
  ...getEslintConfigs(),
  ...getLocalPluginConfigs(),
  ...getTseslintConfigs(),
  ...getStylisticConfigs(),
  ...getImportXConfigs(),
  ...getPerfectionistConfigs(),
  ...getEslintImportResolverTypescriptConfigs(),
  ...getEslintCommentsConfigs()
);

function getEslintCommentsConfigs(): Linter.Config[] {
  return defineConfig([
    {
      // eslint-disable-next-line import-x/no-named-as-default-member -- The default export name `recommended` is too confusing.
      extends: [commentsConfigs.recommended],
      files: typeScriptFiles,
      rules: {
        '@eslint-community/eslint-comments/require-description': 'error'
      }
    }
  ]);
}

function getEslintConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [eslint.configs.recommended],
      files: typeScriptFiles,
      rules: {
        'accessor-pairs': 'error',
        'array-callback-return': 'error',
        'camelcase': 'error',
        'capitalized-comments': ['error', 'always', { block: { ignorePattern: 'v8' } }],
        'complexity': 'error',
        'consistent-this': 'error',
        'curly': 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'default-param-last': 'error',
        'eqeqeq': 'error',
        'func-name-matching': 'error',
        'func-names': 'error',
        'func-style': [
          'error',
          'declaration',
          {
            allowArrowFunctions: false
          }
        ],
        'grouped-accessor-pairs': [
          'error',
          'getBeforeSet'
        ],
        'guard-for-in': 'error',
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-console': [
          'error',
          {
            allow: [
              'warn',
              'error'
            ]
          }
        ],
        'no-constructor-return': 'error',
        'no-div-regex': 'error',
        'no-else-return': [
          'error',
          {
            allowElseIf: false
          }
        ],
        'no-empty-function': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-implicit-coercion': [
          'error',
          {
            allow: [
              '!!'
            ]
          }
        ],
        'no-implied-eval': 'error',
        'no-inner-declarations': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': [
          'error',
          {
            detectObjects: true,
            enforceConst: true,
            ignore: [
              -1,
              0,
              1
            ]
          }
        ],
        'no-multi-assign': 'error',
        'no-multi-str': 'error',
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-object-constructor': 'error',
        'no-octal-escape': 'error',
        'no-promise-executor-return': 'error',
        'no-proto': 'error',
        'no-restricted-syntax': [
          'error',
          {
            message: 'Do not use definite assignment assertions (!). Initialize the field or make it optional.',
            selector: 'PropertyDefinition[definite=true]'
          },
          {
            message: 'Do not use definite assignment assertions (!) on abstract fields.',
            selector: 'TSAbstractPropertyDefinition[definite=true]'
          },
          {
            message: 'Do not use anonymous inline object types in function parameters. Define a named interface instead.',
            selector: ':function > Identifier TSTypeLiteral'
          },
          {
            message: 'Do not use anonymous inline object types in function return types. Define a named interface instead.',
            selector: ':function > TSTypeAnnotation TSTypeLiteral'
          },
          {
            message: 'Do not use anonymous inline object types in interface/method signatures. Define a named interface instead.',
            selector: 'TSMethodSignature TSTypeLiteral'
          },
          {
            message: 'Do not use anonymous inline object types as type arguments. Define a named interface instead.',
            selector: 'TSTypeParameterInstantiation TSTypeLiteral'
          },
          {
            message: 'Do not use anonymous inline object types in type annotations. Define a named interface instead.',
            selector: 'TSTypeAnnotation TSTypeLiteral'
          },
          {
            message: 'Do not use anonymous inline object types in type assertions. Define a named interface instead.',
            selector: 'TSAsExpression TSTypeLiteral'
          },
          {
            message: 'Do not use override on __ methods. Use a numbered variant instead, e.g., method2__().',
            selector: 'MethodDefinition[override=true][key.name=/.*__$/]'
          },
          {
            message: 'Do not use double type assertions (as X as Y). Use createMockOf<T>() from src/internal/cast.ts instead.',
            selector: 'TSAsExpression > TSAsExpression'
          },
          {
            message: 'Do not use _ prefix on methods or functions. The _ prefix is for unused parameters only.',
            selector: 'MethodDefinition[key.name=/^_/]:not([override=true])'
          },
          {
            message: 'Do not use _ prefix on methods or functions. The _ prefix is for unused parameters only.',
            selector: 'FunctionDeclaration[id.name=/^_/]'
          },
          {
            message: 'Do not rename imports with "Mock" in the alias. Mock classes are the canonical types in this project — use the original name.',
            selector: 'ImportSpecifier[local.name=/Mock/]:not([imported.name=/Mock/])'
          },
          {
            message: 'Avoid dynamic import(). Use static imports instead. Only use dynamic imports for lazy/conditional loading.',
            selector: 'ImportExpression'
          },
          {
            message: 'Do not use `{} as T`. Use `createMockOf<T>()` from src/internal/cast.ts instead.',
            selector: 'TSAsExpression > ObjectExpression[properties.length=0]'
          },
          {
            message: 'Do not use `declare` on class properties. Initialize the property or use a regular type annotation.',
            selector: 'PropertyDefinition[declare=true]'
          }
        ],
        'no-return-assign': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unreachable-loop': 'error',
        'no-unused-expressions': 'error',
        'no-useless-assignment': 'error',
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-void': 'error',
        'object-shorthand': 'error',
        'operator-assignment': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-exponentiation-operator': 'error',
        'prefer-named-capture-group': 'error',
        'prefer-numeric-literals': 'error',
        'prefer-object-has-own': 'error',
        'prefer-object-spread': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'radix': 'error',
        'require-atomic-updates': 'error',
        'require-await': 'error',
        'symbol-description': 'error',
        'unicode-bom': 'error',
        'vars-on-top': 'error',
        'yoda': 'error'
      }
    },
    {
      files: ['src/obsidian/**/*.ts'],
      rules: {
        'no-constructor-return': 'off',
        'no-restricted-imports': ['error', {
          paths: [{
            message: 'Do not import obsidian-typings in src/obsidian/. Inline needed type shapes in src/internal/types.ts instead.',
            name: 'obsidian-typings'
          }],
          patterns: [{
            group: ['obsidian-typings/*'],
            message: 'Do not import obsidian-typings in src/obsidian/. Inline needed type shapes in src/internal/types.ts instead.'
          }]
        }]
      }
    },
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['scripts/helpers/@types/markdownlint-cli2-config-schema.d.ts'],
      rules: {
        'no-restricted-syntax': 'off'
      }
    },
    {
      files: ['**/*.test.ts', 'scripts/eslint-config.ts'],
      rules: {
        'no-magic-numbers': 'off'
      }
    }
  ]);
}

function getEslintImportResolverTypescriptConfigs(): Linter.Config[] {
  return defineConfig([
    {
      settings: {
        'import-x/resolver-next': [
          createTypeScriptImportResolver({
            alwaysTryTypes: true
          })
        ]
      }
    }
  ]);
}

function getGitignoreConfigs(): Linter.Config[] {
  const gitignorePath = join(getRootFolder() ?? '', '.gitignore');
  if (!existsSync(gitignorePath)) {
    return [];
  }
  return [includeIgnoreFile(gitignorePath)];
}

function getImportXConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [
        eslintPluginImportXFlatConfigs.recommended,
        eslintPluginImportXFlatConfigs.typescript,
        eslintPluginImportXFlatConfigs.errors,
        eslintPluginImportXFlatConfigs.warnings
      ],
      files: typeScriptFiles,
      rules: {
        'import-x/consistent-type-specifier-style': 'error',
        'import-x/extensions': ['error', 'ignorePackages'],
        'import-x/first': 'error',
        'import-x/imports-first': 'error',
        'import-x/newline-after-import': 'error',
        'import-x/no-absolute-path': 'error',
        'import-x/no-amd': 'error',
        'import-x/no-anonymous-default-export': 'error',
        'import-x/no-commonjs': 'error',
        'import-x/no-cycle': 'error',
        'import-x/no-default-export': 'error',
        'import-x/no-deprecated': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/no-dynamic-require': 'error',
        'import-x/no-empty-named-blocks': 'error',
        'import-x/no-extraneous-dependencies': 'error',
        'import-x/no-import-module-exports': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-named-default': 'error',
        'import-x/no-namespace': 'error',
        'import-x/no-nodejs-modules': 'error',
        'import-x/no-relative-packages': 'error',
        'import-x/no-restricted-paths': 'error',
        'import-x/no-self-import': 'error',
        'import-x/no-unassigned-import': [
          'error',
          {
            allow: [
              '**/*.css',
              '**/*.sass',
              '**/*.scss'
            ]
          }
        ],
        'import-x/no-unused-modules': 'off',
        'import-x/no-useless-path-segments': 'error',
        'import-x/no-webpack-loader-syntax': 'error'
      }
    },
    {
      files: ['scripts/**/*.ts', 'src/script-utils/**/*.ts'],
      rules: {
        'import-x/no-nodejs-modules': 'off'
      }
    }
  ]);
}

function getLocalPluginConfigs(): Linter.Config[] {
  return defineConfig([{
    files: typeScriptFiles,
    plugins: {
      local: localPlugin
    },
    rules: {
      'local/no-used-underscore-params': 'error'
    }
  }]);
}

function getPerfectionistConfigs(): Linter.Config[] {
  return defineConfig([{
    extends: [perfectionistConfigs['recommended-alphabetical']],
    files: typeScriptFiles
  }]);
}

function getStylisticConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [
        stylistic.configs.recommended,
        stylistic.configs.customize({
          arrowParens: true,
          braceStyle: '1tbs',
          commaDangle: 'never',
          semi: true
        })
      ],
      files: typeScriptFiles,
      rules: {
        '@stylistic/indent': 'off',
        '@stylistic/indent-binary-ops': 'off',
        '@stylistic/jsx-one-expression-per-line': 'off',
        '@stylistic/no-extra-semi': 'error',
        '@stylistic/object-curly-newline': [
          'error',
          {
            ExportDeclaration: {
              minProperties: 2,
              multiline: true
            },
            ImportDeclaration: {
              minProperties: 2,
              multiline: true
            }
          }
        ],
        '@stylistic/operator-linebreak': [
          'error',
          'before',
          {
            overrides: {
              '=': 'after'
            }
          }
        ],
        '@stylistic/quotes': [
          'error',
          'single',
          {
            allowTemplateLiterals: 'never'
          }
        ]
      }
    }
  ]);
}

function getTseslintConfigs(): Linter.Config[] {
  return defineConfig([
    {
      extends: [
        // eslint-disable-next-line import-x/no-named-as-default-member -- The default export name `_default` is too confusing.
        ...tseslint.configs.strictTypeChecked,
        // eslint-disable-next-line import-x/no-named-as-default-member -- The default export name `_default` is too confusing.
        ...tseslint.configs.stylisticTypeChecked
      ],
      files: typeScriptFiles,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          projectService: true,
          tsconfigRootDir: getRootFolder() ?? ''
        }
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/no-invalid-void-type': ['error', {
          allowAsThisParameter: true
        }],
        '@typescript-eslint/no-this-alias': ['error', {
          allowedNames: [
            'that'
          ]
        }],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/prefer-readonly': 'error'
      }
    },
    {
      settings: {
        react: {
          version: 'detect'
        }
      }
    }
  ]);
}

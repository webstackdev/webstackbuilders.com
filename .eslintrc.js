const restrictedGlobals = require('confusing-browser-globals')
const level = process.env['NODE_ENV'] === 'production' ? 'error' : 'warn'

/** @typedef { import('eslint').Linter.BaseConfig } eslintConfig */
const eslintConfig = {
  /**
   * Common sets of recommended rules included for all linted files
   */
  extends: [
    /** Compatible with '@typescript-eslint/recommended' below */
    'eslint:recommended',
    /** For ESLint directive comments e.g. //eslint-disable-line */
    'plugin:eslint-comments/recommended',
    /** Linting of ES2015+/ES6+ import/export syntax, verify file paths and import names */
    'plugin:import/recommended',
    /** Axe accessibility linting rules */
    'plugin:jsx-a11y/recommended',
    /** ESLint's rules for Node.js */
    'plugin:node/recommended',
    /** Helps identify potential security hotspots but suffers a lot of false positives */
    'plugin:security/recommended',
    /** Lint TOML files */
    'plugin:toml/standard',
  ],
  /**
   * Plugins used in common for all linted files
   */
  plugins: ['import', 'jsx-a11y', 'no-null', 'security'],
  /** No globals are enabled for ESLint by default: 'writable', 'readonly', or 'off'. */
  globals: {
    NodeJS: 'readonly',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  /**
   * The 'project' and 'tsconfigRootDir' key/values could be moved into overrides,
   * so that a separate tsconfig.eslint.json file isn't necessary. The issue is
   * that eslint will exit on an error that the '.eslintrc.js' file isn't included
   * in projects, and so either '.eslintrc.js' has to be excluded or explicitly included.
   */
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    requireConfigFile: false,
    resolvePluginsRelativeTo: __dirname,
    sourceType: 'module',
  },
  /**
   * Plugin configuration objects
   */
  settings: {
    /** Handle TypeScript with the eslint-plugin-import extensions */
    'import/parsers': {
      '@typescript-eslint/parser': ['**/*.ts'],
    },
    'import/resolver': {
      typescript: {
        /**
         * Always try to resolve types under `<root>@types` directory
         * even it doesn't contain any source code, like `@types/unist`
         */
        alwaysTryTypes: true,
        /** TSConfig for eslint-import-resolver-typescript */
        project: './tsconfig.eslint.json',
      },
    },
  },
  /**
   * Common rule settings for all linted files
   */
  rules: {
    /** Issue with Prettier https://github.com/prettier/eslint-plugin-prettier/issues/65: */
    'arrow-body-style': 'off',
    camelcase: [level],
    curly: [level, 'all'],
    /** enable eslint-comments plugin */
    'eslint-comments/no-unused-disable': level,
    'import/no-unresolved': level,
    'import/no-webpack-loader-syntax': level,
    /** Recommending VS Code extension amatiasq.sort-imports */
    'import/order': 'off',
    'jsdoc/check-tag-names': [
      level,
      {
        definedTags: ['NOTE:', 'TODO:', 'jest-environment', 'jest-environment-options'],
        jsxTags: true,
      },
    ],
    'new-cap': [level, { newIsCap: true, capIsNew: false }],
    /** Doesn't seem to work with Yarn PnP, it resolves packages on disk to check import */
    'node/no-extraneous-import': 'off',
    'node/no-unpublished-import': [
      level,
      {
        allowModules: ['electron'],
      },
    ],
    /** Set to off because this package is not published as a library */
    'node/no-unpublished-require': 'off',
    'no-new': level,
    /** Plugin that disallows null literals to encourage using undefined instead: */
    'no-null/no-null': level,
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    'no-unused-expressions': [level, { allowShortCircuit: true, allowTernary: true }],
    'no-unused-vars': [level, { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'no-useless-escape': 'off',
    /** Issue with Prettier https://github.com/prettier/eslint-plugin-prettier/issues/65: */
    'prefer-arrow-callback': 'off',
    'prefer-object-spread': level,
    'prefer-spread': level,
    /** Getting false positives on HTMLElement.classList.add/.remove methods */
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-object-injection': 'off',
    'security/detect-unsafe-regex': 'off',
    /** Too many false positives from using @TODO and no way to add add'l tags to rule */
    'tsdoc/syntax': 'off', // tsdoc-characters-after-block-tag
  },

  /**
   * Over-rides based on glob patterns for the common configuration above.
   * The last override block has highest precedence. All config options are
   * valid except `root` and `ignorePatterns`.
   */
  overrides: [
    /**
     * Options that apply only to JavaScript files and not to TypeScript files
     */
    {
      files: ['**/*.js'],
      /** Recommended warnings for JSDoc linter */
      extends: [
        'plugin:jsdoc/recommended',
        /** Runs Prettier as ESLint rule and reports differences as ESLint issues */
        'prettier', // must be last
      ],
      plugins: ['jsdoc'],
      rules: {
        /**
         * JSDoc Rules
         */
        'jsdoc/check-examples': 'off', // not supported yet in ESLint v8
        'jsdoc/check-indentation': level,
        'jsdoc/check-line-alignment': level,
        'jsdoc/check-syntax': level,
        /** Applies a regex to description so that it's text-only starting with a capital */
        'jsdoc/match-description': 'off',
        'jsdoc/no-bad-blocks': level,
        'jsdoc/no-defaults': level,
        'jsdoc/no-types': 'off',
        'jsdoc/require-param': 'off',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-returns': 'off',
        'jsdoc/require-returns-type': 'off',
        /** JSDoc does not support import() for typedefs */
        'jsdoc/valid-types': 'off',
      },
    },
    /**
     * Settings for TypeScript files only
     */
    {
      files: ['**/*.ts', '**/*.d.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        /** Required path to tsconfig to use rules which require type information */
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
      extends: [
        /** Enable all the recommended rules for TypeScript linting */
        'plugin:@typescript-eslint/recommended',
        /** Enable rules that require type-checking, disabled by default for performance */
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        /** Adds TypeScript support to eslint-plugin-import, can use `paths` in tsconfig.json */
        'plugin:import/typescript',
        /** Runs Prettier as ESLint rule and reports differences as ESLint issues */
        'prettier', // must be last
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': level,
        '@typescript-eslint/consistent-type-assertions': [
          level,
          { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
        ],
        /**
         * Avoid un-fixable lint errors reported within .js/.jsx files
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
         */
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unused-vars': [
          level,
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-var-requires': level,
        /** Prohibits using a type assertion that does not change the type of an expression. */
        '@typescript-eslint/no-unnecessary-type-assertion': level,
        '@typescript-eslint/restrict-template-expressions': 'off',
        /** Continue allowing triple-slash refs, TS wants to use 'import' syntax instead */
        '@typescript-eslint/triple-slash-reference': 'off',
        /** TypeScript allows ES modules, default from node/recommended is 'error' */
        'node/no-missing-import': 'off',
        /** Allow import declarations which import private modules, default 'error' */
        'node/no-unpublished-import': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
      },
    },
    /**
     * Settings for Javascript Jest files only
     */
    {
      files: [
        '**/*.spec.js',
        '**/__tests__/**/*.js',
        '**/__mocks__/**/*.js',
        '**/__fixtures__/**/*.js',
      ],
      extends: [
        /** DOM testing library */
        'plugin:testing-library/dom',
        /** Best practices and anticipate common mistakes when writing tests with jest-dom */
        'plugin:jest-dom/recommended',
      ],
      plugins: ['testing-library', 'jest', 'jest-dom', 'jsdoc'],
      rules: {
        'jest/no-disabled-tests': 'off',
        'jest/no-focused-tests': level,
        'jest/no-identical-title': level,
        'jest/prefer-to-have-length': level,
        'jest/valid-expect': level,
        'jsdoc/check-examples': 'off', // not supported yet in ESLint v8
        'jsdoc/check-indentation': level,
        'jsdoc/check-line-alignment': level,
        'jsdoc/check-syntax': level,
        /** Applies a regex to description so that it's text-only starting with a capital */
        'jsdoc/match-description': 'off',
        'jsdoc/no-bad-blocks': level,
        'jsdoc/no-defaults': level,
        'jsdoc/no-types': 'off',
        /** JSDoc does not support import() for typedefs */
        'jsdoc/valid-types': 'off',
        'testing-library/prefer-screen-queries': 'off',
      },
      env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        'jest/globals': true,
        node: true,
      },
    },
    /**
     * Settings for Typescript Jest files only
     */
    {
      files: [
        '**/*.spec.ts',
        '**/__tests__/**/*.ts',
        '**/__mocks__/**/*.ts',
        '**/__fixtures__/**/*.ts',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        /** Required path to tsconfig to use rules which require type information */
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
      extends: [
        /** Enable all the recommended rules for TypeScript linting */
        'plugin:@typescript-eslint/recommended',
        /** DOM testing library */
        'plugin:testing-library/dom',
        /** Best practices and anticipate common mistakes when writing tests with jest-dom */
        'plugin:jest-dom/recommended',
        /** Enable rules that require type-checking, disabled by default for performance */
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        /** Adds TypeScript support to eslint-plugin-import, can use `paths` in tsconfig.json */
        'plugin:import/typescript',
        /** Runs Prettier as ESLint rule and reports differences as ESLint issues */
        'prettier', // must be last
      ],
      plugins: ['@typescript-eslint', 'testing-library', 'jest', 'jest-dom'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        /** Relax Typescript rules in test files */
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unused-vars': [
          level,
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-var-requires': level,
        /** Prohibits using a type assertion that does not change the type of an expression. */
        '@typescript-eslint/no-unnecessary-type-assertion': level,
        '@typescript-eslint/restrict-template-expressions': 'off',
        /** Continue allowing triple-slash refs, TS wants to use 'import' syntax instead */
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'jest/no-disabled-tests': 'off',
        'jest/no-focused-tests': level,
        'jest/no-identical-title': level,
        'jest/prefer-to-have-length': level,
        'jest/valid-expect': level,
        /** TypeScript allows ES modules, default from node/recommended is 'error' */
        'node/no-missing-import': 'off',
        /** Allow import declarations which import private modules, default 'error' */
        'node/no-unpublished-import': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        'testing-library/prefer-screen-queries': 'off',
      },
      env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        'jest/globals': true,
        node: true,
      },
    },
    /**
     * Settings for configuration files only
     */
    {
      files: ['.eslintrc.js', '*.config.*', 'jest.setup.*', 'gulpfile.ts'],
      env: {
        commonjs: true,
        jest: true,
        node: true,
      },
    },
    /**
     * Settings for TOML Files only
     */
    {
      files: ['**/*.toml'],
      parser: 'toml-eslint-parser',
    },
  ],
}

module.exports = eslintConfig

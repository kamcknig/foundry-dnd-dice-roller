module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
  ignorePatterns: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['import', 'prefer-arrow', 'eslint-plugin-import', '@typescript-eslint', '@typescript-eslint/tslint'],
  rules: {
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'off',
      {
        accessibility: 'explicit'
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: [
          'private-static-field',
          'protected-static-field',
          'public-static-field',
          'private-instance-field',
          'protected-instance-field',
          'public-instance-field',
          'constructor',
          'private-static-method',
          'protected-static-method',
          'public-static-method',
          'private-instance-method',
          'protected-instance-method',
          'public-instance-method'
        ]
      }
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/quotes': ['warn', 'single'],
    '@typescript-eslint/unified-signatures': 'error',
    'arrow-parens': ['off', 'as-needed'],
    'comma-dangle': 'off',
    complexity: 'off',
    'constructor-super': 'error',
    'dot-notation': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': 'off',
    'id-match': 'off',
    'import/no-deprecated': 'warn',
    'import/order': 'off',
    'jsdoc/no-types': 'off',
    'max-classes-per-file': 'off',
    'max-len': [
      'error',
      {
        code: 240
      }
    ],
    'new-parens': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': [
      'error',
      {
        allow: [
          'log',
          'warn',
          'dir',
          'timeLog',
          'assert',
          'clear',
          'count',
          'countReset',
          'group',
          'groupEnd',
          'table',
          'dirxml',
          'error',
          'groupCollapsed',
          'Console',
          'profile',
          'profileEnd',
          'timeStamp',
          'context'
        ]
      }
    ],
    'no-debugger': 'error',
    'no-empty': 'off',
    'no-eval': 'error',
    'no-fallthrough': 'error',
    'no-invalid-this': 'off',
    'no-multiple-empty-lines': 'off',
    'no-new-wrappers': 'error',
    'no-restricted-imports': ['error', 'rxjs/Rx'],
    'no-shadow': [
      'error',
      {
        hoist: 'all'
      }
    ],
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'off',
    'no-unsafe-finally': 'error',
    'no-unused-expressions': 'off',
    'no-unused-labels': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'prefer-arrow/prefer-arrow-functions': 'warn',
    'quote-props': ['error', 'as-needed'],
    radix: 'error',
    'spaced-comment': 'warn',
    'use-isnan': 'error',
    'valid-typeof': 'off',
    '@typescript-eslint/tslint/config': [
      'error',
      {
        rules: {
          'component-class-suffix': true,
          'component-selector': true,
          'contextual-lifecycle': true,
          'directive-class-suffix': true,
          'directive-selector': true,
          'jsdoc-format': true,
          'no-conflicting-lifecycle': true,
          'no-host-metadata-property': true,
          'no-inputs-metadata-property': true,
          'no-output-native': true,
          'no-output-on-prefix': true,
          'no-output-rename': true,
          'no-outputs-metadata-property': true,
          'no-reference-import': true,
          'template-banana-in-box': true,
          'template-no-negated-async': false,
          'use-lifecycle-interface': true,
          'use-pipe-transform-interface': true
        },
        rulesDirectory: ['codelyzer']
      }
    ],
    '@typescript-eslint/await-thenable': ['error'],
    '@typescript-eslint/no-for-in-array': ['error'],
    '@typescript-eslint/no-misused-promises': ['warn'],
    '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
    '@typescript-eslint/prefer-includes': ['warn'],
    '@typescript-eslint/prefer-regexp-exec': ['warn'],
    '@typescript-eslint/prefer-string-starts-ends-with': ['warn'],
    'require-await': ['off'],
    '@typescript-eslint/require-await': ['error'],
    '@typescript-eslint/unbound-method': ['warn'],
    'no-var': ['error'],
    'prefer-const': ['warn'],
    'prefer-rest-params': ['error'],
    'prefer-spread': ['error'],
    '@typescript-eslint/adjacent-overload-signatures': ['error'],
    '@typescript-eslint/ban-ts-ignore': ['error'],
    '@typescript-eslint/ban-types': ['error'],
    camelcase: ['off'],
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/class-name-casing': ['error'],
    '@typescript-eslint/consistent-type-assertions': ['error'],
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    '@typescript-eslint/member-delimiter-style': ['error'],
    'no-array-constructor': ['off'],
    '@typescript-eslint/no-array-constructor': ['error'],
    'no-empty-function': ['off'],
    '@typescript-eslint/no-empty-interface': ['error'],
    '@typescript-eslint/no-misused-new': ['error'],
    '@typescript-eslint/no-namespace': ['error'],
    '@typescript-eslint/no-this-alias': ['error'],
    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-use-before-define': ['off'],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/prefer-namespace-keyword': ['error'],
    '@typescript-eslint/triple-slash-reference': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    '@typescript-eslint/unbound-method': ['warn', { ignoreStatic: true }]
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ],
  settings: {}
};

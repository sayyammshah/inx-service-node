import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { parser: tsParser, globals: globals.browser } },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/database/*', 'src/database/*'],
              message:
                "Relative path imports are not allowed. Please use the '@database' alias instead."
            }
          ],
          paths: []
        }
      ]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
]

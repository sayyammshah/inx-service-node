import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
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
              group: ['src/controllers/insights/*.controller.ts'],
              message:
                "Please import controllers using the '@controllers' alias, not directly from individual controller files."
            },
            {
              group: ['src/database/config/*.config.ts', 'src/database/queries/insert.query'],
              message:
                "Please import database utilities using the '@database' alias, not directly from respective files."
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

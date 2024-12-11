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
              group: ['src/controllers/insights/*'],
              message:
                "Please import components using the '@components' alias, not directly from individual components files."
            },
          ],
          paths: []
        }
      ]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
]

import pluginVue from 'eslint-plugin-vue';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import prettierConfig from 'eslint-plugin-prettier';
import pluginVitest from '@vitest/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs([
  // Vue and TypeScript Configuration
  ...pluginVue.configs['flat/essential'], // Vue 3 config
  vueTsConfigs.recommended, // TypeScript config for Vue
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
    },
    plugins: {
      prettier: prettierConfig,
    },
    rules: {
      'array-bracket-spacing': ['error', 'never'],
      // allow paren-less arrow functions
      'arrow-parens': ['error', 'as-needed'],
      complexity: ['error', 32],
      'no-console': 'off',
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'only-multiline',
        },
      ],
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-empty': 'error',
      'no-return-assign': 'off',
      'no-return-await': 'warn',
      'object-shorthand': ['error', 'always'],
      'no-extra-semi': 'error',
      'no-case-declarations': 'off',
      'no-prototype-builtins': 'off',
      'no-unused-vars': 'off', // use only @typescript-eslint/no-unused-vars
      'no-var': 'error',
      'no-void': 'off',
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      'sort-imports': [
        'warn',
        {
          ignoreDeclarationSort: true,
          ignoreCase: true,
        },
      ],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'always',
          asyncArrow: 'always',
        },
      ],
      // Not in override, these apply to non-.vue files too
      'vue/attributes-order': [
        'error',
        {
          alphabetical: true,
        },
      ],
    },
  },
  {
    name: 'app/overrides',
    files: ['**/*.vue'],
    rules: {
      indent: 'off',
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
        },
      ],
      'vue/html-closing-bracket-spacing': 'error',
      'vue/no-v-html': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 4,
          multiline: 1,
        },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/script-indent': [
        'error',
        2,
        {
          baseIndent: 1,
          switchCase: 1,
          ignores: [],
        },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/valid-v-on': 'off', // This rule doesn't allow empty event listeners
      'vue/valid-v-slot': ['error', { allowModifiers: true }],
      'no-restricted-properties': [
        'error',
        {
          object: 'this',
          property: '$router',
          message: "Using '$router' is not allowed. Use 'useRouter()' instead.",
        },
        {
          object: 'this',
          property: '$route',
          message: "Using '$route' is not allowed. Use 'useRoute()' instead.",
        },
        {
          object: 'this',
          property: '$t',
          message: "Using '$t' is not allowed. Use 'useI18n()' instead.",
        },
        {
          object: 'this',
          property: '$vuetify',
          message:
            "Using '$vuetify' is not allowed. Use Composition API instead.",
        },
      ],
      'vue/no-restricted-syntax': [
        'error',
        {
          selector: "Identifier[name='$router']",
          message:
            "Using '$router' in templates is not allowed. Use 'useRouter()' instead.",
        },
        {
          selector: "Identifier[name='$route']",
          message:
            "Using '$route' in templates is not allowed. Use 'useRoute()' instead.",
        },
        {
          selector: "Identifier[name='$t']",
          message:
            "Using '$t' in templates is not allowed. Use 'useI18n()' instead.",
        },
        {
          selector: "Identifier[name='$vuetify']",
          message:
            "Using '$vuetify' in templates is not allowed. Use Composition API instead.",
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "VariableDeclarator > Identifier[name='$router']",
          message: "The variable name '$router' is not allowed.",
        },
        {
          selector: "AssignmentExpression > Identifier[name='$router']",
          message: "Reassignment to '$router' is not allowed.",
        },
        {
          selector: "VariableDeclarator > Identifier[name='$route']",
          message: "The variable name '$route' is not allowed.",
        },
        {
          selector: "AssignmentExpression > Identifier[name='$route']",
          message: "Reassignment to '$route' is not allowed.",
        },
        {
          selector: "VariableDeclarator > Identifier[name='$t']",
          message: "The variable name '$t' is not allowed.",
        },
        {
          selector: "AssignmentExpression > Identifier[name='$t']",
          message: "Reassignment to '$t' is not allowed.",
        },
        {
          selector: "VariableDeclarator > Identifier[name='$vuetify']",
          message: "The variable name '$vuetify' is not allowed.",
        },
        {
          selector: "AssignmentExpression > Identifier[name='$vuetify']",
          message: "Reassignment to '$vuetify' is not allowed.",
        },
      ],
    },
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/docs/**',
      // DEV
      '**/__OLD__/**',
      '**/archive/**',
    ],
  },
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting, // Prettier skip formatting for conflicts
]);

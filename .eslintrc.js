module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
        'array-bracket-spacing': ['error', 'never'],
        'arrow-parens': ['error', 'always'],
        'block-spacing': ['error', 'always'],
        'brace-style': 'off',
        'comma-spacing': 'off',
        'eol-last': ['error', 'always'],
        'indent': ['error', 4, {
            'SwitchCase': 1,
        }],
        'jsx-quotes': ['error', 'prefer-double'],
        'keyword-spacing': 'off',
        'object-curly-spacing': ['error', 'never'],
        'no-cond-assign': 'error',
        'no-multi-spaces': 'error',
        'no-redeclare': 'off',
        'no-trailing-spaces': 'error',
        'no-whitespace-before-property': 'error',
        'semi': 'off',
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            asyncArrow: 'always',
            named: 'never',
        }],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'spaced-comment': ['error', 'always', {exceptions: ['-']}],
        'quotes': 'off',
        '@typescript-eslint/array-type': ['error', {
            default: 'array-simple',
        }],
        'yoda': ['error', 'never'],
        '@typescript-eslint/brace-style': 'error',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/comma-spacing': ['error', {
            before: false,
            after: true,
        }],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/func-call-spacing': ['error', 'never'],
        '@typescript-eslint/keyword-spacing': ['error', {
            after: true,
            before: true,
        }],
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/no-duplicate-imports': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/quotes': ['error', 'single', {
            allowTemplateLiterals: true,
            avoidEscape: true,
        }],
    },
    overrides: [
        {
            files: ['tasks/**/*.js', 'api/**/*.js', 'shared/**/*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/no-implicit-any-catch': 'off'
            },
        },
        {
            files: ['src/**/*.ts'],
            parserOptions: {
                ecmaVersion: 2019,
                project: 'src/tsconfig.json',
            },
            rules: {
                '@typescript-eslint/no-implied-eval': 'error',
                '@typescript-eslint/switch-exhaustiveness-check': 'error',
                '@typescript-eslint/promise-function-async': 'error',
            }
        },
    ],
};

import nextTypescript from "eslint-config-next/typescript";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
    {
        ignores: ['.next/**', 'node_modules/**', 'dist/**', '.turbo/**'],
    },
    ...nextTypescript,
    ...nextCoreWebVitals,
    {
        rules: {
            '@next/next/no-img-element': 'off',
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/no-empty-object-type': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },
]

export default eslintConfig
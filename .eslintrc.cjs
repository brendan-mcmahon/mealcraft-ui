module.exports = {
	root: true,
	env: { browser: true, es2020: true, node: true },
	parser: "@typescript-eslint/parser",
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh', '@typescript-eslint'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'react-hooks/exhaustive-deps': 'off',
		'react/prop-types': 'off',
	},
}

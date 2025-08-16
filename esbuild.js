const esbuild = require("esbuild");

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');
const isWeb = process.argv.includes('--web');

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
	name: 'esbuild-problem-matcher',

	setup(build) {
		build.onStart(() => {
			console.log('[watch] build started');
		});
		build.onEnd((result) => {
			result.errors.forEach(({ text, location }) => {
				console.error(`✘ [ERROR] ${text}`);
				console.error(`    ${location.file}:${location.line}:${location.column}:`);
			});
			console.log('[watch] build finished');
		});
	},
};

async function main() {
	const baseConfig = {
		entryPoints: ['src/extension.ts'],
		bundle: true,
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		external: ['vscode'],
		logLevel: 'silent',
		plugins: [esbuildProblemMatcherPlugin],
	};

	const nodeConfig = {
		...baseConfig,
		format: 'cjs',
		platform: 'node',
		outfile: 'dist/extension.js',
	};

	const webConfig = {
		...baseConfig,
		format: 'cjs',
		platform: 'browser',
		outfile: 'dist/web/extension.js',
		target: ['es2020'],
	};

	const config = isWeb ? webConfig : nodeConfig;
	const ctx = await esbuild.context(config);
	
	if (watch) {
		await ctx.watch();
	} else {
		await ctx.rebuild();
		await ctx.dispose();
	}
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});

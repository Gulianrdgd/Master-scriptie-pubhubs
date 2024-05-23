const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
	configureWebpack: {
		devtool: 'source-map',
		resolve: {
			fallback: {
				crypto: false,
				fs: false,
				path: require.resolve("path-browserify")
			},
		},
		module: {  // Add a rules section for workers
			rules: [
				{
					test: /\.e2ee-worker\.(js|ts|jsm)$/, // Targets .e2ee-worker.js, .e2ee-worker.ts, .e2ee-worker.jsm
					use: { loader: 'worker-loader' }
				},
				{
					test: /\.wasm$/,
					type: "asset/inline",
				},
			],
		},
		experiments: {
			asyncWebAssembly: true,
			syncWebAssembly: true
		}

	},
	chainWebpack(config) {
		config.resolve.symlinks(false);
		config.resolve.alias.set('vue', path.resolve('./node_modules/vue'));
		config.resolve.alias.set('pinia', path.resolve('./node_modules/pinia'));
	},
	transpileDependencies: true,
	publicPath: '/',
});

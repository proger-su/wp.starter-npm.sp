/*
 * Tarot Laravel Mix
 *
 * Check the documentation at
 * https://laravel.com/docs/5.6/mix
 */

const mix = require("laravel-mix");

// Production and Dev ENV configuration
if (!mix.inProduction()) {
	mix
		.webpackConfig({
			devtool: "source-map",
		})
		.sourceMaps();
}

// Settings
mix.options({
	processCssUrls: false,
	postCss: [require("postcss-flexbugs-fixes")()],
});

// Process Assets
mix
	// -> styles
	.sass("src/scss/front.scss", "dist/css")
	.sass("src/scss/admin.scss", "dist/css")
	.sass("src/scss/editor.scss", "dist/css")
	.js(["src/js/front.js"], "dist/js")
	.js(["src/js/admin.js"], "dist/js")
	.js(["src/js/editor.js"], "dist/js");


// -> Gutenberg block styles and scripts
const blocks = ['container'];
blocks.forEach(function (block) {
	mix.react(`blocks/${block}/editor.js`, `dist/blocks/${block}`)
	mix.react(`blocks/${block}/view.js`, `dist/blocks/${block}`)
		.sass(`blocks/${block}/editor.scss`, `dist/blocks/${block}`)
		.sass(`blocks/${block}/view.scss`, `dist/blocks/${block}`);
});

mix.webpackConfig({
	output: {
		publicPath: "/wp-content/themes/starter/dist/",
	},
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
	},
});

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
    .js(["src/js/front.js"], "dist/js")
    .js(["src/js/admin.js"], "dist/js")
    .webpackConfig({
        output: {
            publicPath: "/wp-content/themes/wp.starter-npm.sp/dist/",
        },
        externals: {
            react: "React",
            "react-dom": "ReactDOM",
        },
    });

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    reactScriptsVersion: "react-scripts",
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // so you can do `import ... from '@/...'`
        },
        // The `configure` function lets you modify the default Webpack config that CRA uses under the hood
        configure: (webpackConfig, { env, paths }) => {
            const oneOfRuleIndex = webpackConfig.module.rules.findIndex((rule) =>
                Array.isArray(rule.oneOf)
              );
        
              if (oneOfRuleIndex >= 0) {
                const oneOf = webpackConfig.module.rules[oneOfRuleIndex].oneOf;
        
                // Update SCSS Modules loader
                const scssModuleRuleIndex = oneOf.findIndex(
                  (rule) => rule.test && rule.test.toString().includes('module.scss')
                );
        
                if (scssModuleRuleIndex >= 0) {
                  oneOf[scssModuleRuleIndex].use = [
                    require.resolve('style-loader'),
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        modules: {
                          localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                      },
                    },
                    require.resolve('sass-loader'),
                  ];
                }
              }
            // 1. Add TS/TSX extensions if needed:
            webpackConfig.resolve.extensions.push('.ts', '.tsx', '.jsx');
            webpackConfig.plugins = webpackConfig.plugins.filter(
                (plugin) => !(plugin instanceof ForkTsCheckerWebpackPlugin)
              );
              webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
                if (rule.oneOf) {
                  rule.oneOf = rule.oneOf.filter(
                    (loader) => !/source-map-loader/.test(loader.loader || '')
                  );
                }
                return rule;
              });
            // 2. Add (or override) rules for SCSS and SCSS modules:
            //    We push new rules onto `webpackConfig.module.rules`.
            //    Typically, CRA already has some SCSS support if you installed `sass`,
            //    but this shows how to do it manually if you need full control.
            webpackConfig.module.rules.push({
                test: /\.(png|jpe?g|gif|svg|ico)$/, // Static assets
                use: [
                  {
                    loader: require.resolve('file-loader'),
                    options: {
                      name: '[name].[hash:8].[ext]',
                      outputPath: 'static/media',
                    },
                  },
                ],
              });
        
             
        

            // webpackConfig.module.rules.push(
            //     {
            //         test: /\.module\.scss$/, // SCSS *Modules*
            //         use: [
            //             require.resolve('style-loader'),
            //             {
            //                 loader: require.resolve('css-loader'),
            //                 options: {
            //                     modules: true, // Enable CSS Modules
            //                 },
            //             },
            //             require.resolve('sass-loader'), // SCSS -> CSS
            //         ],
            //     },
            //     {
            //         test: /\.scss$/,        // Global SCSS (non-modules)
            //         exclude: /\.module\.scss$/,
            //         use: [
            //             require.resolve('style-loader'),
            //             require.resolve('css-loader'),
            //             require.resolve('sass-loader'),
            //         ],
            //     }
            // );

            // // Remove CRA-specific behaviors
            // webpackConfig.entry = paths.appIndexJs; // Force entry point
            // webpackConfig.devtool = "source-map"; // Add source maps
            // webpackConfig.optimization = {
            //     ...webpackConfig.optimization,
            //     splitChunks: false, // Disable chunk splitting
            // };
            // // 3. Return the modified config
            return webpackConfig;
        },
    },
};

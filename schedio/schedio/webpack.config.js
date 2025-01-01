import path from 'path';

module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'], // Include `.tsx`
        alias: {
          '@': path.resolve(__dirname, 'src'), // Adjust as needed
        },
      },
    module: {
      rules: [
        {
          test: /\.module\.scss$/, // SCSS Modules
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { modules: true }, // Enable CSS Modules
            },
            "sass-loader", // SCSS to CSS
          ],
        },
        {
          test: /\.scss$/, // Global SCSS
          exclude: /\.module\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
  };
  
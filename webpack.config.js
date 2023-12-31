const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/app.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.(plug|svg|jpg|jpeg|gif|png)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|tff|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
            ],
          },
        },
      }),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/views/home.html',
      minify: true,
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'main.js',
    assetModuleFilename: 'images/[name]',
  },
};

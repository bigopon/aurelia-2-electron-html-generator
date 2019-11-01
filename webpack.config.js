const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = function(env = {}) {
  const production = env.production === true || process.env.NODE_ENV === 'production';
  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-maps' : 'inline-source-map',
    entry: {
      app: './src/main.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    module: {
      rules: [
        { test: /\.css$/i, use: ["style-loader", "css-loader"] },
        { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/ },
        { test: /\.html$/i, use: '@aurelia/webpack-loader', exclude: /node_modules/ }
      ]
    },
    plugins: [
      new CopyPlugin([
        { context: './node_modules/monaco-editor/min', from: '**/*', to: /* root of dist folder in webpack */'./' },
      ]),
      // new MonacoWebpackPlugin({
      //   languages: ['html', 'javascript']
      // })
    ]
  }
}

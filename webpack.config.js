const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/build/`,
    filename: 'laughing-man.js',
    libraryTarget: 'umd',
    library: 'laughingMan'
  }
}

module.exports = webpackConfig

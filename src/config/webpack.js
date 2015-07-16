import path from 'path';

const ROOT = path.join(__dirname, '../');

export default {
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  output: {
    filename: 'index.js'
  },
  resolve: {
    modulesDirectories: [ROOT, path.join(ROOT, '../node_modules')],
    extensions: ['', '.js', '.json']
  },
  resolveLoader: {
    root: ROOT,
    modulesDirectories: [ROOT, path.join(ROOT, '../node_modules')],
    extensions: ['', '.js', '.json']
  }
};

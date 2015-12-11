var path = require( 'path' );

module.exports = {
  devTool: 'eval',
  debug: true,
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './app/app.js',
    './app/index.html'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join( __dirname, 'public' )
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'react-hot', 'babel-loader' ]
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
};

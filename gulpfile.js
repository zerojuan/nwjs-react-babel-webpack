var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var webpack = require( 'webpack' );
var WebpackDevServer = require( 'webpack-dev-server' );
var webpackConfig = require( './webpack.config.js' );

gulp.task( 'webpack-dev-server', function( callback ) {
  var myConfig = Object.create( webpackConfig );

  new WebpackDevServer( webpack(myConfig), {
    contentBase: './public',
    hot: true,
    watchOptions: {
      aggregateTimeout: 100
    },
    noInfo: false
  }).listen( 8080, 'localhost', function( err ) {
    if ( err ) {
      throw new gutil.PluginError( 'webpack-dev-server', err );
    }

    gutil.log( '[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html' );
  });
})

gulp.task( 'default', [ 'webpack-dev-server' ]);

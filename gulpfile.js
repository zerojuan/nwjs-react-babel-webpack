'use strict';

var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var watch = require( 'gulp-watch' );
var less = require( 'gulp-less' );
var gls = require( 'gulp-live-server' );
var webpack = require( 'webpack' );
var WebpackDevServer = require( 'webpack-dev-server' );
var webpackConfig = require( './webpack.config.js' );
var webpackProductionConfig = require( './webpack.production.config.js' );

var map = require( 'map-stream' );
var touch = require( 'touch' );

var $ = require( 'gulp-load-plugins' )();

gulp.task( 'css', function() {
  // gulp.src([
  //   'src/styles/*.less',
  //   'src/styles/*.less'
  // ]).on( 'error', function( err ) {
  //   gutil.log( err );
  // })
  // .pipe( gulp.dest( 'public/' ))
  // .pipe( map( function( a, cb ) {
  //   if ( devServer.invalidate ) {
  //     devServer.invalidate();
  //   }
  //   cb();
  // }));
});

gulp.task( 'copy-assets', function() {
  gulp.src( 'assets/**' )
    .pipe( gulp.dest( 'public' ) );
});

gulp.task( 'copy-backend', function() {
  gulp.src([ 'server/**', '!server/package.json' ])
    .pipe( gulp.dest( 'public' ) );
});

gulp.task( 'webpack:build', function( callback ) {
	// modify some webpack config options
	var myConfig = Object.create( webpackProductionConfig );
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				'NODE_ENV': JSON.stringify( 'production' )
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack( myConfig, function( err, stats ) {
		if ( err ) {
      throw new gutil.PluginError( 'webpack:build', err );
    }
		gutil.log( '[webpack:build]', stats.toString({
			colors: true
		}) );
		callback();
	});
});

var devServer = {};
gulp.task( 'webpack-dev-server', [ 'css' ], function( callback ) {
  // ensure there's a public main.css
  touch.sync( './public/main.css', new Date() );

  devServer = new WebpackDevServer( webpack( webpackConfig ), {
    contentBase: './public',
    hot: true,
    watchOptions: {
      aggregateTimeout: 100
    },
    inline: true,
    noInfo: false
  });
  devServer.listen( 8080, '0.0.0.0', function( err ) {
    if ( err ) {
      throw new gutil.PluginError( 'webpack-dev-server', err );
    }
    gutil.log( '[webpack-dev-server]', 'http://localhost:8080' );
    return callback();
  });

});

gulp.task( 'local-backend', function( callback ) {
  var server = gls.new([ '--harmony', 'server/index.js' ]);
  // this will achieve `node --harmony myapp.js`
  // you can access cwd args in `myapp.js` via `process.argv`
  server.start();

  // use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch([ 'server/**/*.js' ], function( file ) {
    server.notify.apply( server, [ file ]);
  });

  // Note: try wrapping in a function if getting an error like
  // `TypeError: Bad argument at TypeError (native) at ChildProcess.spawn`
  gulp.watch([ 'server/**/*.js' ], function() {
    server.start.bind( server )( );
  });
});

gulp.task( 'default', function() {
  gulp.start( 'build' );
});

gulp.task( 'build', [ 'webpack:build', 'copy-assets', 'copy-backend' ]);

gulp.task( 'watch',
  [ 'css',
    'copy-assets',
    'webpack-dev-server',
    'local-backend',
    'copy-backend' ], function() {
  gulp.watch([ 'client/styles/**' ], [ 'css' ]);
  gulp.watch([ 'assets/**' ], [ 'copy-assets' ]);
  gulp.watch([ 'server/**' ], [ 'copy-backend' ]);
});

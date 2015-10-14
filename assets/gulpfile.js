const SETTINGS = {
    JS_LIBS: {
        SRC: [
            //'./bower_components/react/react.js',
            //'./bower_components/react/react-dom.js'
        ],
        DEST: '../public/js',
        FILENAME: 'libs.js'
    },
    JS: {
        SRC: './js/app.js',
        DEST: '../public/js',
        FILENAME: 'app.js'
    }
};


var del = require( 'del' ),
    source = require( 'vinyl-source-stream' ),
    buffer = require( 'vinyl-buffer' ),

    gulp = require( 'gulp' ),
    gutil = require( 'gulp-util' ),
    runSequence = require('run-sequence' ),
    plumber = require( 'gulp-plumber' ),
    concat = require( 'gulp-concat' ),
    uglify = require( 'gulp-uglify' ),

    sourcemaps = require( 'gulp-sourcemaps' ),
    browserify = require( 'browserify' ),
    babelify = require( 'babelify' ),
    watchify = require( 'watchify' ),

    browserSync = require( 'browser-sync' ).create();


var b = browserify( Object.assign(
    {},
    watchify.args,
    {
        debug: true,
        entries: [ SETTINGS.JS.SRC ],
        transform: [ [ 'babelify' ] ]
    }
) );

function bundleJS(){
    return b.bundle()
        .on( 'error', function( err ){
            console.log( err.message );
            browserSync.notify( err.message, 3000 );
            this.emit( 'end' );
        } )
        .pipe( plumber() )
        .pipe( source( SETTINGS.JS.FILENAME ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( uglify() )
        .pipe( sourcemaps.write( './') )
        .pipe( gulp.dest( SETTINGS.JS.DEST ) );
}

gulp.task( 'build:js', bundleJS );

gulp.task( 'build:js:watch', function(){
    b = watchify( b );
    b.on( 'update', bundleJS );
    b.on( 'log', gutil.log );
    bundleJS();
} );

gulp.task( 'build:jsLibs', function(){
    gulp.src( SETTINGS.JS_LIBS.SRC )
        .pipe( uglify() )
        .pipe( concat( SETTINGS.JS_LIBS.FILENAME ) )
        .pipe( gulp.dest( SETTINGS.JS_LIBS.DEST ) );
} );

gulp.task( 'build', function( callback ){
    // ToDo: clean
    runSequence( [ 'build:jsLibs', 'build:js' ], callback  );
} );


gulp.task( 'browserSync', function(){
    browserSync.init( {
        files: '../public/**/*.*',
        server: {
            baseDir: '../public/',
            https: true
        }
    } );

    return gulp.watch( '../public/**/*.*' ).on( 'change', browserSync.reload );
} );


gulp.task( 'server', function( callback ){
    runSequence( 'build', 'build:js:watch', 'browserSync', callback  );
} );


gulp.task( 'default', [ 'build' ] );
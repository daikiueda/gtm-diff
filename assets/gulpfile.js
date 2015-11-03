const SETTINGS = {
    JS_LIBS: {
        SRC: [
            './bower_components/react/react.js',
            './bower_components/react/react-dom.js'
        ],
        DEST: '../public/js',
        FILENAME: 'libs.js'
    },
    JS: {
        SRC: './js/app.js',
        DEST: '../public/js',
        FILENAME: 'app.js'
    },

    CSS: {
        SRC: './css/**/*.scss',
        DEST: '../public/css'
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
    watchify = require( 'watchify' ),

    sass = require( 'gulp-sass' ),
    postcss = require( 'gulp-postcss' ),
    postcssImport = require( 'postcss-import' ),
    autoprefixer = require( 'autoprefixer' ),

    browserSync = require( 'browser-sync' ).create(),
    ghPages = require( 'gulp-gh-pages' );


var b = browserify( {
    cache: {},
    packageCache: {},
    debug: true,
    entries: [ SETTINGS.JS.SRC ]
} );

function bundleJS(){
    return b
        .transform( 'babelify', { presets: [ "es2015", "react" ] } )
        .transform( 'browserify-shim', { global: true } )
        .bundle()
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
    b.plugin( watchify );
    b.on( 'update', bundleJS );
    b.on( 'log', gutil.log );
    return bundleJS();
} );

gulp.task( 'build:jsLibs', function(){
    gulp.src( SETTINGS.JS_LIBS.SRC )
        .pipe( uglify() )
        .pipe( concat( SETTINGS.JS_LIBS.FILENAME ) )
        .pipe( gulp.dest( SETTINGS.JS_LIBS.DEST ) );
} );


gulp.task( 'build:css', function(){
    return gulp
        .src( SETTINGS.CSS.SRC )
        .pipe( sourcemaps.init() )
        .pipe( sass( { outputStyle: 'expanded' } ).on( 'error', sass.logError ) )
        .pipe( postcss( [ postcssImport, autoprefixer ] ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( SETTINGS.CSS.DEST ) );
} );

gulp.task( 'build:css:watch', function(){
    return gulp.watch( SETTINGS.CSS.SRC, [ 'build:css' ] );
} );


gulp.task( 'build', function( callback ){
    // ToDo: clean
    runSequence( [ 'build:jsLibs', 'build:js' ], callback  );
} );


gulp.task( 'browserSync', function(){
    browserSync.init( {
        server: {
            baseDir: '../public/',
            https: true
        }
    } );

    return gulp.watch( '../public/**/*.*' ).on( 'change', browserSync.reload );
} );

gulp.task( 'server', function( callback ){
    runSequence( 'build', 'build:js:watch', 'build:css:watch', 'browserSync', callback  );
} );

gulp.task( 'gh-pages', function(){
    return gulp.src( '../public/**/*' )
        .pipe( ghPages() );
} );

gulp.task( 'default', [ 'server' ] );
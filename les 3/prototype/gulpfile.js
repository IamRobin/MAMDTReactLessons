'use strict'
const express = require('express');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const livereload = require('gulp-livereload');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const conf = require('./gulpfile.conf');
const plumber = require('gulp-plumber');

const exitHandler = (options, err) => {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
};
const startExpress = () => { 
  const app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(conf.dev));
  app.listen(conf.expressPort);
};
function handleError(e) {
  console.log(e);
  this.emit('end');
}
let outputfolder = conf.dist;

gulp.task('set-development', () => {
    outputfolder = conf.dev;
});

gulp.task('lint', () => {
  return gulp.src(conf.javascriptSource)
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('js', () => browserify({entries: conf.appEntry, debug: true})
        .transform("babelify", { presets: ["es2015","react"] })
        .bundle()
        .on('error', handleError)
        .pipe(plumber({errorHandler: handleError}))
        .pipe(source('main.js'))
        .pipe(buffer())
        // .pipe(sourcemaps.init({loadMaps:true}))
        // .pipe(uglify())
        // .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(outputfolder+'/js'))
        .pipe(livereload())    
);
// Serve
gulp.task('serve', () => {
    startExpress();
    gulp.start('set-development','lint','js','watch');
    livereload.listen(conf.livereloadPort);
});

// Watch
gulp.task('watch', () => {
  // Watch .js files
  gulp.watch([conf.javascriptSource], ['set-development','lint','js']);
  gulp.watch(['app/js/**']).on('change', livereload.changed);
});

process.stdin.resume();
process.on('exit', exitHandler.bind(null,{cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));


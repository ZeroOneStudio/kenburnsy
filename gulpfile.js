var gulp = require('gulp'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    csscomb = require('gulp-csscomb'),
    prefix = require('gulp-autoprefixer'),
    pkg = require('./package.json');

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('jshint', function () {
  var stream = gulp.src('./src/*.js')
    .pipe(jshint({ lookup: true }))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));

  return stream;
});

gulp.task('build', ['jshint'], function () {
  // 
  // Uglify and add banner to javascript files
  // 
  gulp.src('./src/*.js')
    .pipe(header(banner, { pkg: pkg } ))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg } ))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));

  // 
  // Autoprefix and add banner to css files
  // 
  gulp.src('./src/*.css')
    .pipe(prefix('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe(csscomb('zen'))
    .pipe(header(banner, { pkg: pkg } ))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['jshint', 'build']);

gulp.task('travis', ['jshint']);
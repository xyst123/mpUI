const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');

function buildCSS(callback) {
  gulp.src('./src/style/*.less')
    .pipe(less())
    .pipe(postcss([autoprefixer]))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./lib/style'))
  callback()
}

function copyFonts(callback) {
  gulp.src('./src/style/fonts/*')
    .pipe(gulp.dest('./lib/style/fonts'))
  callback()
}

exports.default = gulp.series(buildCSS, copyFonts)

const gulp = require('gulp');
const less = require('gulp-less');
const cssBase64 = require('gulp-css-base64');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const pxToVw = require('postcss-px-to-viewport');

function buildCSS(callback) {
  const processor = pxToVw({
    viewportWidth: 375,
    viewportHeight: 667,
    viewportUnit: 'vw'
  });
  gulp.src('./src/style/*.less')
    .pipe(less())
    .pipe(postcss([autoprefixer, processor]))
    .pipe(cleanCSS())
    .pipe(cssBase64())
    .pipe(gulp.dest('./dist/style'))
    .pipe(gulp.dest('node_modules/mp-ui/style'));
  callback()
}

function copyDist(callback) {
  gulp.src('dist/*.js')
    .pipe(gulp.dest('node_modules/mp-ui'));
  callback()
}

exports.default = gulp.series(buildCSS, copyDist)

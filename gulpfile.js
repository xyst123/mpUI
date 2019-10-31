const gulp = require('gulp');
const less = require('gulp-less');
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
    .pipe(gulp.dest('./dist/style'));
  callback()
}

exports.default = gulp.series(buildCSS)

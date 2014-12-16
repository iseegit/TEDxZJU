var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

var src = {
  css: 'assets/css/main.css',
  images: 'assets/img/**/*'
};

var dest = {
  css: 'static/css',
  images: 'static/img'
}

gulp.task('css', function() {
  return gulp.src(src.css)
    .pipe(autoprefixer())
    .pipe(gulp.dest(dest.css))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(dest.css));
});

gulp.task('img', function() {
  return gulp.src(src.images) 
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(gulp.dest(dest.images));
});

gulp.task('watch', function() {

  gulp.watch(src.css, ['css']);
  gulp.watch(src.images, ['img']);

  livereload.listen();
  gulp.watch(['_site/**']).on('change', livereload.changed);
});


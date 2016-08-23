var gulp = require('gulp'),
    $    = require('gulp-load-plugins')();

gulp.task('js:app', function() {
  return gulp.src(['public/scripts/index.js', 'public/scripts/**/*.js', '!public/scripts/app.js', '!public/scripts/vendor/**/*.js'])
        .pipe($.concat('app.js'))
        .pipe(gulp.dest('./public/scripts'));
});
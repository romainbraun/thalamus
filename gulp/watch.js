var gulp = require('gulp'),
    $    = require('gulp-load-plugins')();

gulp.task('watch', function(cb) {
  $.watch(['public/scripts/**/*.js', '!public/scripts/app.js', '!public/scripts/vendor/**/*.js'], function(){
    gulp.start('js:app', cb);
  });
});


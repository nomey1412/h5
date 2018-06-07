var config = require('../config');
if(!config.tasks.move) return;

var gulp = require('gulp');

//var path = require('path');


gulp.task('default', () => {
  return gulp.src(config.tasks.move.src + '/**')
    .on('error', function(err){
      console.log(err);
    })
    .pipe( gulp.dest(config.tasks.move.dest) );
})

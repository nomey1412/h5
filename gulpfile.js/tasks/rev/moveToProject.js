var config       = require('../../config');
if(!config.tasks.move) return;

var gulp         = require('gulp')
var path         = require('path')


gulp.task('moveToProject', function () {
  return gulp.src(path.join(config.tasks.move.src + '/index.html'))
    .on('error', function(err) { console.log(err); })
    .pipe( gulp.dest(config.tasks.move.dest));
});


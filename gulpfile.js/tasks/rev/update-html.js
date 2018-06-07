var gulp       = require('gulp');
var config     = require('../../config');
var revReplace = require('gulp-rev-replace');
var path       = require('path');
var fs = require('fs');

// 5) Update asset references in HTML
gulp.task('update-html', function() {

  var json = fs.readFileSync( path.join(config.root.dest, "/rev-manifest.json") );
  json = json.toString();
  json = eval('('+ json +')')
  var newjson = {};
  for(var k in json){
    newjson['/'+k] = config.resource + '/' + json[k];
  }
  fs.writeFileSync(path.join(config.root.dest, "/rev-manifest.json"), JSON.stringify(newjson) );
  var manifest = gulp.src(path.join(config.root.dest, "/rev-manifest.json"));
  
  return gulp.src(path.join(config.root.dest, '/*.html'))
    .pipe(revReplace({ manifest : manifest }))
    .pipe(gulp.dest(config.root.dest));
});

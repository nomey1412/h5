var config = require('../../config');
var gulp = require('gulp');

var fs = require('fs');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var path = require('path');
var qshell = path.join(__dirname, '../../../qshell');
var qiniu = path.join(__dirname, '../../../q-config.json');

// for linux
if( /linux/i.test(process.platform) ){
  qshell = path.join(__dirname, '../../../qshell-linux');
}

gulp.task('upload-qiniu', function () {
  var data= fs.readFileSync(qiniu);
  data= data.toString();
  data= JSON.parse(data);
  execSync(qshell + ' account '+ data.AK + ' ' + data.SK);
  exec(qshell + ' qupload 2 ' + qiniu,
      (error, stdout, stderr) => {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
});

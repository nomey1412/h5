var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')

// If you are familiar with Rails, this task the equivalent of `rake assets:precompile`
gulp.task('rev', function(cb) {
  gulpSequence(
    // 1) Add md5 hashes to assets referenced by CSS and JS files
    'rev-assets',
    // 2) Update asset references with reved filenames in compiled css + js
    'rev-update-references',
    // 3) Rev and compress CSS and JS files (this is done after assets, so that if a referenced asset hash changes, the parent hash will change as well
    'rev-css',
    // 4) Update asset references in HTML
    'update-html',
    /*
    // 5) Report filesizes
    // 'size-report',
    // 6) copy rev-manifest.json 文件到 后端工程的资源文件夹
    // 'moveToProject',
    // 7 生成静态资源离线缓存map文件
    // 'createMainifest',
    */
    // 8 上传七牛
    //'upload-qiniu',
  cb);
});


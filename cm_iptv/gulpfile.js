var config = {
  src: "src", // 要搬运的目录
  moveTo: "iptv",  // 搬运去的目录

  server: "src", // 服务器根目录
  // server: "./", // 服务器根目录
  target: "index.html" // 要监视(执行)的html文件

};

// 一次安装
// npm install pump gulp-sass gulp-clean gulp-autoprefixer gulp-clean-css gulp-imagemin gulp-changed gulp-sourcemaps gulp-uglify run-sequence gulp-rename gulp-htmlmin gulp-postcss imagemin-pngquant gulp-cache gulp-concat del browser-sync --save-dev
var gulp = require('gulp'),
  clean = require('gulp-clean'),
  pump = require('pump'),
  runSequence = require('run-sequence'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create();


// 同步更新浏览器
gulp.task('browser', function () {
  browserSync.init({
    files: ['**'],  // 修改HTML也刷新
    server: {
      baseDir: config.server,  // 设置服务器的根目录
      index: config.target // 指定默认打开的文件
    },
    port: 8050  // 指定访问服务器的端口号
  });

});

// 编译,合并,重命名,加前缀,压缩
gulp.task('mincss', [], function (cb) {
  pump([
      gulp.src(config.src + '/scss/*.scss'),
      sass(),
      // concat('index.css'),  //合并后的文件名
      rename({suffix: '.min'}),
      changed(config.src, {extension: '.css'}),
      sourcemaps.init(),
      postcss(autoprefixer({
        // 兼容主流浏览器的最新两个版本
        browsers: ['last 2 versions'],
        cascade: true
      })),
      minifyCss(
        {keepSpecialComments: '*'}
        //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      ),
      sourcemaps.write('.'),
      gulp.dest(config.src + '/css/')
    ], cb
  );
});

// 清理目标目录
gulp.task('clean', function (cb) {
  pump([
    gulp.src(config.moveTo),
    clean()
  ], cb);
});

// 搬运文件
gulp.task('move', function () {
  return gulp.src([config.src + '/**/*.css', config.src + '/**/*.js', config.src + '/**/*.png', config.src + '/**/*.html', '!' + config.src + '/*/views/*/scss/', '!' + config.src + '/styles/','!' + config.src + '/*/views/L2/','!' + config.src + '/*/views/L3/'])
    .pipe(gulp.dest(config.moveTo));
});

// 只执行编译sass和同步浏览器
// gulp.task('default', function(cb) {
//     runSequence('mincss', cb);
// });
gulp.task('default', ['browser']);

gulp.task('cm', function (cb) {
  runSequence('clean', 'move', cb);
});
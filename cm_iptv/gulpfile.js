
var config = {
  // src: "src/assets", // 文件资源css,js,image等
  // srcView: "src/View/Company2", // 文件资源html等
  server: "src/page1/views/L2", // 服务器根目录
  target: "index.html" // 要监视(执行)的html文件
  // dest: "dev/assets", // 生产环境文件夹
  // destView: "dev/View/Company2" // 生产环境文件夹
};

// 一次安装
// npm install pump gulp-sass gulp-clean gulp-autoprefixer gulp-clean-css gulp-imagemin gulp-changed gulp-sourcemaps gulp-uglify run-sequence gulp-rename gulp-htmlmin gulp-postcss imagemin-pngquant gulp-cache gulp-concat del browser-sync --save-dev
var gulp        = require('gulp'),

    browserSync  = require('browser-sync').create();


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


// 只执行编译sass和同步浏览器
// gulp.task('default', function(cb) {
//     runSequence('mincss', cb);
// });
gulp.task('default', ['browser']);
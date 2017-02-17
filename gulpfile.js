// 载入插件 {{{
var gulp = require('gulp'),
	less = require('gulp-less'),//less编译
	clean_css = require('gulp-clean-css'); //压缩css
	min_html = require('gulp-htmlmin'),
	plumber = require('gulp-plumber');//防止watch出错退出
	rename = require('gulp-rename'),//重命名
	changed = require('gulp-changed'); //真正修改过的文件才能通过管道
	urlify = require('gulp-uglify');
	livereload = require('gulp-livereload');//刷新浏览器
//}}}

source_path = 'source/';
//dest_path = 'g:/http/site/hunan_poker/';
dest_path = 'e:/http/sites/hunanpoker/';

// less {{{
gulp.task('less', function() {
	gulp.src(source_path + 'files/*.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(clean_css())
		.pipe(rename(function(path) {
			path.basename += '.min'
		}))
		.pipe(changed(dest_path + 'files/'))
		.pipe(gulp.dest(dest_path+'files/'))
		.pipe(livereload({auto:false}));
});
//}}}

// html {{{
gulp.task('html', function() {
	gulp.src(source_path + '*.html')
		.pipe(plumber())
		.pipe(min_html({
			removeComments: true,
			collapseWhitespace: true
		}))
		.pipe(changed(dest_path))
		.pipe(gulp.dest(dest_path))
		.pipe(livereload({auto:false}));
});
//}}}

// uglify {{{
gulp.task('uglify', function() {
	gulp.src(source_path + 'files/*.js')
		.pipe(plumber())
		.pipe(ugliry())
		.pipe(rename(function(path) {
			path.basename += '.min'
		}))
		.pipe(changed(dest_path + 'files/'))
		.pipe(gulp.dest(dest_path + 'files/'))
		.pipe(livereload({auto:false}));
});
//}}}

// imgs {{{
gulp.task('imgs', function() {
	gulp.src(source_path + 'img/*.{png,gif,jpg}')
		.pipe(gulp.dest(dest_path + 'img/'));
});
//}}}

// wathc{{{
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(source_path + 'files/*.less', ['less']);
	gulp.watch(source_path + 'files/*.js', ['uglify']);
	gulp.watch(source_path + '**/*.html', ['html']);
	gulp.watch(source_path + '*.{png,gif,jpg}', ['imgs']);
});
//}}}

gulp.task('default', ['watch']);



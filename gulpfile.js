// 载入插件 {{{
var gulp = require('gulp'),
	less = require('gulp-less'),//less编译
	min_css = require('gulp-minify-css'),//压缩css
	min_html = require('gulp-htmlmin'),
	plumber = require('gulp-plumber');//防止watch出错退出
	rename = require('gulp-rename'),//重命名
	changed = require('gulp-changed'); //真正修改过的文件才能通过管道
	urlify = require('gulp-uglify');
	livereload = require('gulp-livereload');//刷新浏览器
//}}}

// less {{{
gulp.task('less', function() {
	gulp.src('source/files/*.less')
		.pipe(plumber())
		.pipe(less())
		//.pipe(min_css({compatibility:'ie7'}))
		.pipe(min_css())
		.pipe(rename(function(path) {
			path.basename += '.min'
		}))
		.pipe(changed('g:/http/site/hunan_poker/files/'))
		.pipe(gulp.dest('g:/http/site/hunan_poker/files/'))
		.pipe(livereload({auto:false}));
});
//}}}

// html {{{
gulp.task('html', function() {
	gulp.src('source/*.html')
		.pipe(plumber())
		.pipe(min_html({
			removeComments: true,
			collapseWhitespace: true
		}))
		.pipe(changed('g:/http/site/hunan_poker/'))
		.pipe(gulp.dest('g:/http/site/hunan_poker/'))
		.pipe(livereload({auto:false}));
});
//}}}

// uglify {{{
gulp.task('uglify', function() {
	gulp.src('source/files/*.js')
		.pipe(plumber())
		.pipe(ugliry())
		.pipe(rename(function(path) {
			path.basename += '.min'
		}))
		.pipe(changed('g:/http/site/hunan_poker/files/'))
		.pipe(gulp.dest('g:/http/site/hunan_poker/files/'))
		.pipe(livereload({auto:false}));
});
//}}}

gulp.task('imgs', function() {
	gulp.src('source/img/*.{png,gif,jpg}')
		.pipe(gulp.dest('g:/http/site/hunan_poker/img/'));
});


// wathc{{{
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('source/files/*.less', ['less']);
	gulp.watch('source/files/*.js', ['uglify']);
	gulp.watch('source/**/*.html', ['html']);
	gulp.watch('source/*.{png,gif,jpg}', ['imgs']);
});
//}}}

gulp.task('default', ['watch']);



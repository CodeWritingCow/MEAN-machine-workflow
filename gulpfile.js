// load the plugins
var gulp = require('gulp'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint');

// define a task called css
gulp.task('css', function() {
	
	// grab the less file, process the LESS, save to style.css
	return gulp.src('public/assets/css/style.less')
	.pipe(less())
	.pipe(minifyCSS())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('public/assets/css'));
});

// task for linting js files
gulp.task('js', function() {
	return gulp.src(['server.js', 'public.app/*.js', 'public/app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
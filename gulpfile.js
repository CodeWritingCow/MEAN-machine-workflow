// load the plugins
var gulp = require('gulp'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate');

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

// task to lint, minify and concat frontend files
gulp.task('scripts', function() {
	return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('all.js'))
		.pipe(uglify)
		.pipe(gulp.dest('public/dist'));
});

// task to lint, minify and concat frontend angular files
gulp.task('angular', function() {
	return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(ngAnnotate())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'));
});

gulp.task('watch', function() {
	// watch the less file and run the css task
	gulp.watch('public/assets/css/style.less', ['css']);

	// watch js files and run lint and run js and angular tasks
	gulp.watch(['server.js', 'public/app/*.js', 'public/app/**/*.js'], ['js', 'angular']);
});
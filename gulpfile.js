var gulp    		= require('gulp'); 				// Gulp
var fs 				= require('fs');
var es 				= require('event-stream');
var path 			= require('path');
var uglify  		= require('gulp-uglify'); 		// Plugin for uglifing javascript
var sass            = require('gulp-sass'); 		// Package to compile scss files
var cssmin 			= require('gulp-minify-css'); 	// Plugin to minfy css
var rename			= require('gulp-rename'); 		// Plugin for renaming files
var autoprefixer   	= require('gulp-autoprefixer'); // Plugin to vendor prefix css
var include 		= require('gulp-include'); 		// Plugin to include files into others
var notify 			= require("gulp-notify"); 		// Plugin to send notifications to the operating system
var imagemin 		= require("gulp-imagemin"); 	// Plugin for minifying jpg, png, gif and svg
var livereload 		= require('gulp-livereload'); 	// Plugin for enable lievreload for your browser
var sourcemaps 		= require('gulp-sourcemaps'); 	// Plugin to enable sourcemaps for scripts


var srcPath 		= 'src/';				// Path to the source files
var distPath 		= 'dist/';				// Path to the distribution files
var componentsPath  = 'bower_components/';

// Paths that gulp should watch
var watchPaths		= {
	scripts: 	[srcPath+'assets/js/*.js', srcPath+'assets/js/**/*.js'],
	images: 	[srcPath+'assets/img/**'],
	sass: 		[srcPath+'assets/sass/*.scss', srcPath+'assets/sass/**/*.scss', '../src/*.scss', '../src/**/*.scss'],
	fonts:      [srcPath+'assets/fonts/**'],
	html:      	[srcPath+'**/*.html', srcPath+'**/*.php']
};


// Task for sass files
gulp.task('sass', function () {
	gulp
		.src(srcPath + 'assets/sass/styles.scss')
		.pipe(sass())
		.on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running sass task" }))
		.pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions'], cascade: false }))
		.on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running sass task" }))
		.pipe(cssmin({ keepBreaks: false }))
		.on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running sass task" }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(distPath + 'assets/css'));
});


// Javscript task
gulp.task('scripts', function(){
	gulp
		.src(srcPath + 'assets/js/*.js')
		.pipe(include())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running scripts task" }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(distPath + 'assets/js'));
});

// Font task
gulp.task('fonts', function () {
	gulp
		.src([srcPath + 'assets/fonts/**'])
		.pipe(gulp.dest(distPath + 'assets/fonts'));
});

// HTML task
gulp.task('html', function () {
	gulp
		.src([srcPath + '*.html'])
		.pipe(include())
		.on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running html task" }))
		.pipe(gulp.dest(distPath));
});

// Images task
gulp.task('images', function () {
	gulp
		.src(srcPath + 'assets/img/**')
		.pipe(imagemin())
		.on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running image task" }))
		.pipe(gulp.dest(distPath + 'assets/img'));
});


// Watch task
gulp.task('watch', function() {
	gulp.watch(watchPaths.scripts, ['scripts']);
	gulp.watch(watchPaths.images, ['images']);
	gulp.watch(watchPaths.sass, ['sass']);
	gulp.watch(watchPaths.html, ['html']);
	gulp.watch(watchPaths.fonts, ['fonts']);

	livereload.listen();
	gulp.watch(distPath + '**').on('change', livereload.changed);
});

// Default task
gulp.task('default', ['scripts', 'images', 'sass', 'fonts', 'html', 'watch']);

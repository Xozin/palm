var gulp   = require('gulp'),
	sass   = require('gulp-sass'),
	pug    = require('gulp-pug'),
	babel = require("gulp-babel"),
	concat = require("gulp-concat"),
	del = require('del'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	path = './';

gulp.task('sass-watch', function() {
	gulp.watch(path + 'sass/**/*.scss', ['sass']);
});

gulp.task('pug-watch', function() {
	gulp.watch(path + 'pug/*.pug', ['pug']);
	gulp.watch(path + 'pug/includes/**/*.pug', ['pug']);

});

gulp.task('sass', function() {
	gulp.src(path + 'sass/styles.scss')
		.pipe(sass({sourceComments: 'normal'}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cssnano())
		.pipe(gulp.dest(path + 'result/css/'));
});
var config = require('./pug/variables.json');

gulp.task('pug', function buildHTML() {
	// console.log(JSON.parse( fs.readFileSync('./pug/variables.json', { encoding: 'utf8' })));
	return gulp.src(path + 'pug/**.pug')
		.pipe(pug({
			'pretty' : true,
			'locals' : config
			// 'data' : JSON.parse( fs.readFileSync('./pug/variables.json', { encoding: 'utf8' }) )
		}))
		.pipe(gulp.dest(path + 'result/'))
});
//
gulp.task('babel', function () {
	gulp.src('./js/*.js')
		.pipe(babel())
		.pipe(gulp.dest('./js/result'))
});
//
// gulp.task('clean', function () {
// 	// return del([path + 'result/*.html', path + 'result/css', path + 'js/result', path + 'js/build']);
// });
//
gulp.task('browserify', ['babel'], function() {
	return browserify('./js/result/script.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./js/build/'));
});
//


gulp.task('default', ['sass', 'pug', 'sass-watch', 'pug-watch' , 'babel' , 'browserify']);
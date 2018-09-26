const gulp = require("gulp");
const del = require("del");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const csso =require("gulp-csso");
const htmlmin =require("gulp-htmlmin");
const imagemin =require("gulp-imagemin");
const babel = require("gulp-babel");
const debug = require("gulp-debug");
const plumber =require("gulp-plumber");
const cached = require("gulp-cached");
const notify =require("gulp-notify");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');
const es3ify = require('gulp-es3ify');
const webserver = require('gulp-webserver');
const pump =require("pump");
const jsDir = 'src/js/**/*.js';
const scssDir = 'src/css/**/*.scss';
const htmlDir = 'src/*.html';
const staticDir = ['src/static/**/**'];
gulp.task("compile:other",function () {
     return gulp
         .src(staticDir)
         .pipe(cached())
         .pipe(gulp.dest("dist/static"))
});
gulp.task("build:other",["compile:other"],function(){
	return gulp
		.src(staticDir)
		.pipe(imagemin())
		.pipe(gulp.dest("dist/static"))
});
gulp.task("compile:html",function(){
	return gulp
		.src(htmlDir)
		.pipe(cached())
		.pipe(htmlmin())
		.pipe(fileinclude())
		.pipe(gulp.dest("dist"))
});
gulp.task("build:html",["compile:html"],function(){
	return gulp
		.src(htmlDir)
		.pipe(fileinclude())
		.pipe(gulp.dest("dist"))
});
gulp.task("compile:scss",function(){
	return gulp
		.src(scssDir)
		.pipe(cached())
		.pipe(debug())
		.pipe(sourcemaps.init())
		.pipe(sass().on("error",sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 8'],
      		cascade: false
		}))
		.pipe(csso())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("dist/css"));
});
gulp.task("build:scss",["compile:scss"],function(){
	return gulp
		.src(scssDir)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error",sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
});
gulp.task("compile:js",function(){
	return gulp
		.src(jsDir)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(cached())
        .pipe(debug())
		.pipe(sourcemaps.init())
	    .pipe(babel(
            {
                presets: ['es2015']
            }
		))
	    .pipe(sourcemaps.write())
	    .pipe(es3ify())
		.pipe(gulp.dest("dist/js"))
});
gulp.task("build:js",["compile:js"],function(){
	pump([
	gulp
	.src(jsDir)
	.pipe(babel(
		{
			presets:["es2015"]
		}
	))
	.pipe(es3ify()),
	uglify(),
	gulp.dest("dist/js")
	])
});
gulp.task("watch:html",function(){
	gulp.watch(htmlDir,["complie:html"])
});
gulp.task("watch:scss",function(){
	gulp.watch(scssDir,["compile:scss"])
});
gulp.task("watch:js",function(){
    gulp.watch(jsDir,["compile:js"])
});
gulp.task("watch:other",function(){
	gulp.watch(staticDir,["compile:other"])
});
gulp.task("clean",function(){
    return del("dist");
})
gulp.task("webserver",function(){
	return gulp.src("./dist")
		.pipe(webserver({
			host:"localhost",
			port:3030,
			livereload:true,
			directoryListing: {
				enable:true,
				path:"./dist"
			},
			open:true,
			proxies: [
				{
					source:"cgi-bin",
					target:"http://172.56.78.23/cgi-bin"
				}
			]
		}))
});
gulp.task(
	"compile",
	["compile:html","compile:scss","compile:js","compile:other"],
	function(){}
	);
gulp.task(
	"build",
	["build:html","build:scss","build:js","build:other"],
	function(){}
	);
gulp.task(
	"watch",
	["compile","watch:html","watch:scss","watch:js","watch:other"],
	function(){}
	);

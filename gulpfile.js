const gulp= require('gulp');
const sass= require('gulp-sass');
const minify= require('gulp-clean-css');
const autoprefixer= require('gulp-autoprefixer');


const SOURCE_DIR= "./static/src/scss";
const BUILD_DIR= "./static/dist/css";


function compileSass() {

	return gulp.src(`${SOURCE_DIR}/*.scss`).pipe(sass())
}


function buildCSS() {

	return compileSass()
			.pipe(gulp.dest(`${BUILD_DIR}`));
}

function buildCSSProd() {

	return compileSass()
			.pipe(autoprefixer())
			.pipe(minify())
			.pipe(gulp.dest(`${BUILD_DIR}`));
}

function watchCSS() {
	return gulp.watch(`${SOURCE_DIR}/**/*.scss`, ['build:css']);
}


gulp.task('build:css', buildCSS);
gulp.task('build:css:prod', buildCSSProd);
gulp.task('watch:css', ['build:css'], watchCSS);

gulp.task('default', ['watch:css']);
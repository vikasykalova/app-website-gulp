const { src, dest, watch, parallel } = require('gulp');

const sass          = require('gulp-sass')(require('sass'));
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');

function style() {
    return src('./css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserlist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('./css/'))
        .pipe(browserSync.stream());
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "./"
          }
     });
}

function scripts() {
    return src([
        '/js/*.js'
    ])
    .pipe(uglify())
    .pipe(dest('/js/'))
    .pipe(browserSync.stream());
}

function watching() {
    watch(['./css/**/*.scss'], style);
    watch(['./js/**/*.js']).on('change', browserSync.reload);
    watch(['./*.html']).on('change', browserSync.reload);
}

exports.style = style;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;

exports.default = parallel(watching, browsersync, style, scripts);
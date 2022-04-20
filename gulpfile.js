const { src, dest, watch, parallel } = require('gulp');

const sass          = require('gulp-sass')(require('sass'));
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');

function browsersync() {
    browserSync.init({
        server : {
            baseDir: '.app/'
        }
    });
}

function scripts() {
    return src([
        'app/js/*.js'
    ])
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream());
}

function style() {
    return src('.app/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserlist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('.app/css/'))
        .pipe(browserSync.stream());
}

function watching() {
    watch(['.app/css/**/*.scss'], style);
    watch(['.app/js/**/*.js'], scripts);
    watch(['.app/*.html']).on('change', browserSync.reload);
}

function build() {
    return src([
        'app/css/styles.css', 
        'app/fonts/**/*',
        'app/js/*.js',
        'app/*.html',
    ], {base: 'app'})
    .pipe(dest('dist'));
}

exports.style = style;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.build = build;

exports.default = parallel(scripts, browsersync, watching)
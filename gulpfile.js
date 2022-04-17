const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const gulpStyleLint = require('gulp-stylelint');

const origin = 'app';
const destination = 'app';
const gulp = require('gulp');
const webp = require('gulp-webp');

function style () {
    return src('./css/**/*.scss')
        .pipe(gulpStyleLint({
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ]
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./css/'))
        .pipe(browserSync.stream())
} 

function watcher () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    watch('./css/**/*.scss', style);
    watch('./*.html').on('change', browserSync.reload);
    watch('./js/**/*.js').on('change', browserSync.reload);
}



function defaultTask(cb) {
    gulp.task('webp', () =>
        gulp
            .src(`${origin}/img/**`)
            .pipe(webp())
            .pipe(gulp.dest(`${destination}/img`))
    );

    gulp.task('live', function () {
        gulp.watch('**/*.css').on('change', function () {
            browserSync.reload();
        });
    });

    cb();
}

exports.style = style;
exports.watcher = watcher;
exports.default = defaultTask;
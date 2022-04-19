const { src, dest, watch } = require('gulp');

const sass = require('gulp-sass')(require('sass'));

function style() {
    return src('./css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./css/'));
}

exports.style = style;
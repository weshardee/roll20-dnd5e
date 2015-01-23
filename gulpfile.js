var gulp = require('gulp');

var src = 'src/';
var dest = 'web/';

var htmlSrc = src + '*.html';
var cssSrc = src + '*.css';

gulp.task('html', function() {
    return gulp.src(htmlSrc)
    .pipe(gulp.dest(dest));
});

gulp.task('css', function() {
    return gulp.src(cssSrc)
    .pipe(gulp.dest(dest));
});

gulp.task('default', ['html', 'css']);

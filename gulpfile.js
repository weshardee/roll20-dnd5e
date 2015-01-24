var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var src = 'src/';
var dest = 'web/';

var glob = {
    html: src + '*.hbs',
    partials: src + 'partials/*.hbs',
    css: src + '*.css'
};

var hbOptions = {
    partials: [glob.partials]
};

// TODO: maybe break tasks up with gulp-load

gulp.task('html', function() {
    return gulp.src(glob.html)
    .pipe(plugins.frontMatter())
    .pipe(plugins.hb(hbOptions))
    .pipe(plugins.ext.replace('html'))
    .pipe(gulp.dest(dest))
    .pipe(reload({stream:true}));
});

gulp.task('css', function() {
    return gulp.src(glob.css)
    .pipe(gulp.dest(dest))
    .pipe(reload({stream:true}));
});

gulp.task('build', ['html', 'css']);

gulp.task('watch', ['build'], function() {
    gulp.watch(glob.html, ['html']);
    gulp.watch(glob.css, ['css']);
});

gulp.task('browser-sync', ['watch'], function() {
    browserSync({
        server: {
            baseDir: dest
        }
    });
});

gulp.task('default', ['browser-sync']);

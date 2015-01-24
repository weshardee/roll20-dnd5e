var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var beep    = require('beepbeep');
var colors  = require('colors');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var src = 'src/';
var dest = 'web/';

var glob = {
    html: src + '*.hbs',
    partials: src + 'partials/*.hbs',
    stylusPartials: src + 'stylus/**/*.styl',
    css: src + '*.styl'
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
    .pipe(plugins.plumber(function () {
        beep();
        console.log('[stylus]'.bold.magenta + ' There was an issue compiling Stylus\n'.bold.red);
        this.emit('end');
    }))
    .pipe(plugins.stylus())
    .pipe(gulp.dest(dest))
    .pipe(reload({stream:true}));
});

gulp.task('build', ['html', 'css']);

gulp.task('watch', ['build'], function() {
    gulp.watch([glob.html, glob.partials], ['html']);
    gulp.watch([glob.css, glob.stylusPartials], ['css']);
});

gulp.task('browser-sync', ['watch'], function() {
    browserSync({
        server: {
            baseDir: dest
        }
    });
});

gulp.task('default', ['browser-sync']);

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var beep    = require('beepbeep');
var colors  = require('colors');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var src = 'src/';
var dest = 'web/';

var glob = {
    jade: src + '*.jade',
    templatePartials: src + 'partials/*.hbs',
    templateData: src + 'data/*.{js,json}',
    stylusPartials: src + 'stylus/**/*.styl',
    css: src + '*.styl'
};

var hbOptions = {
    data: glob.templateData,
    partials: [glob.templatePartials]
};

// TODO: maybe break tasks up with gulp-load

gulp.task('html', function() {
    return gulp.src(glob.jade)
    .pipe(plugins.plumber(function (e) {
        beep();
        console.log('[hb]'.bold.magenta + ' There was an issue compiling html:\n'.bold.red);
        console.log(e);
        console.log('');
        this.emit('end');
    }))
    .pipe(plugins.jade())
    .pipe(gulp.dest(dest))
    .pipe(reload({stream:true}));
});

gulp.task('css', function() {
    return gulp.src(glob.css)
    .pipe(plugins.plumber(function (e) {
        beep();
        console.log('[stylus]'.bold.magenta + ' There was an issue compiling Stylus:\n'.bold.red);
        console.log(e);
        console.log('');
        this.emit('end');
    }))
    .pipe(plugins.stylus())
    .pipe(gulp.dest(dest))
    .pipe(reload({stream:true}));
});

gulp.task('build', ['html', 'css']);

gulp.task('watch', ['build'], function() {
    gulp.watch([glob.html, glob.templatePartials], ['html']);
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

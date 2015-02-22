var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var beep    = require('beepbeep');
var colors  = require('colors');
var fs  = require('fs');
var path = require('path');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var src = 'src/';
var dest = 'web/';

var glob = {
    jade: src + '*.jade',
    jadePartials: src + 'includes/**/*.jade',
    templateData: src + 'data/skills.json',
    stylusPartials: src + 'stylus/**/*.styl',
    media: src + 'images/**/*.*',
    css: src + '*.styl'
};

// TODO: maybe break tasks up with gulp-load

gulp.task('html', function() {
    return gulp.src(glob.jade)
    .pipe(plugins.plumber(function (e) {
        beep();
        console.log('[hb]'.bold.magenta + ' There was an issue compiling html:\n'.bold.red);
        console.log(e.message);
        console.log('');
        this.emit('end');
    }))
    .pipe(plugins.jade({
        data: require('./data')
    }))
    // .pipe(plugins.htmltidy({
    //     'show-body-only': true
    // }))
    // .pipe(plugins.minifyHtml())
    .pipe(gulp.dest(dest))
    .pipe(reload({stream:true}));
});

gulp.task('css', function() {
    return gulp.src(glob.css)
    .pipe(plugins.plumber(function (e) {
        beep();
        console.log('[stylus]'.bold.magenta + ' There was an issue compiling Stylus:\n'.bold.red);
        console.log(e.message);
        console.log('');
        this.emit('end');
    }))
    .pipe(plugins.stylus({
        paths: [src + 'stylus/modules', src + 'stylus/base']
    }))
    .pipe(plugins.autoprefixer({
        browsers: ['last 1 versions']
    }))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(dest))
    .pipe(reload({stream:true}));
});

gulp.task('media', function() {
    return gulp.src(glob.media)
    .pipe(gulp.dest(dest));
});

gulp.task('build', ['html', 'css', 'media']);

gulp.task('watch', ['build'], function() {
    gulp.watch([glob.jade, glob.jadePartials], ['html']);
    gulp.watch([glob.css, glob.stylusPartials], ['css']);
    gulp.watch([glob.media], ['media']);
});

gulp.task('browser-sync', ['watch'], function() {
    browserSync({
        server: {
            baseDir: dest
        }
    });
});

gulp.task('default', ['browser-sync']);

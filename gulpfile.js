var gulp        = require('gulp');
var stylus      = require('gulp-stylus');
var concat      = require('gulp-concat');
var babel       = require('gulp-babel');
var connect     = require('connect');
var serveStatic = require('serve-static');

gulp.task('scripts', ['scripts:vendor', 'scripts:app']);

gulp.task('scripts:vendor', function () {
    var vendorScripts = [
        'node_modules/react/dist/react.min.js',
        'node_modules/react-dom/dist/react-dom.min.js',
        'node_modules/jquery/dist/jquery.min.js'
    ];

    return gulp.src(vendorScripts)
               .pipe(concat('vendor.js'))
               .pipe(gulp.dest('dist'));
});

gulp.task('scripts:app', function () {
    return gulp.src('src/**/*.jsx')
               .pipe(babel({
                   presets: ['react']
               }))
               .pipe(concat('app.js'))
               .pipe(gulp.dest('dist'));
});

gulp.task('styles', ['styles:vendor', 'styles:app']);

gulp.task('styles:vendor', function() {
    var vendorStyles = [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/flag-icon-css/css/flag-icon.min.css'
    ];

    return gulp.src(vendorStyles)
               .pipe(stylus())
               .pipe(concat('vendor.css'))
               .pipe(gulp.dest('dist'));
});

gulp.task('styles:app', function() {
    return gulp.src('src/**/*.styl')
               .pipe(stylus())
               .pipe(concat('app.css'))
               .pipe(gulp.dest('dist'));
});

gulp.task('webserver', function() {
    var app = connect();
    app.use(serveStatic('./'));
    app.listen(8000);
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.jsx', ['scripts:app']);
    gulp.watch('src/**/*.styl', ['styles:app']);
});

gulp.task('compile', ['scripts', 'styles']);

gulp.task('default', ['webserver', 'compile', 'watch']);
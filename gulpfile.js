var gulp        = require('gulp');
var stylus      = require('gulp-stylus');
var babel       = require('gulp-babel');
var connect     = require('connect');
var serveStatic = require('serve-static');

gulp.task('scripts', function () {
    return gulp.src('src/**/*.jsx')
               .pipe(babel({
                   presets: ['react']
               }))
               .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    return gulp.src('src/**/*.styl')
               .pipe(stylus())
               .pipe(gulp.dest('dist'));
});

gulp.task('webserver', function() {
    var app = connect();
    app.use(serveStatic('./'));
    app.listen(8000);
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.jsx', ['scripts']);
    gulp.watch('src/**/*.styl', ['styles']);
});

gulp.task('compile', ['scripts', 'styles']);

gulp.task('default', ['webserver', 'compile', 'watch']);
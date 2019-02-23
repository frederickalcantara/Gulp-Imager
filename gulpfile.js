const gulp = require('gulp');

// Image compression
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const resizer = require('gulp-images-resizer');

// File paths
// ** grabs javascript files from folders in the scripts folder
const dist_path = 'public/dist';
const images_path = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';

// When you are creating a gulp task, you are creating a unit of functionality

// Images
gulp.task('images', function () {
    return gulp.src(images_path)
        .pipe(resizer({
            width: 800,
            height: 800,
            quality: 40
        }))
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(gulp.dest(`${dist_path}/images`));
});


// gulp default bootstraps other tasks, in which you want to run one task by itself first
gulp.task('default', gulp.parallel('images'), function () {
    // Second argument in default gulp tasks run all the tasks before the default task
    console.log('Starting default task');
});


// Gulp live reload is a third party plugin that requires installation
// npm install gulp-livereload@latest --save-dev
// ^^ this is the command to install gulp live reload

// Order is not important in task watching
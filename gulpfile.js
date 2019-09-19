// The require statement tells Node to look into the node_modules folder for a package
// Once the package is found, we assign its contents to the variable
// gulp.src tells the Gulp task what files to use for the task
// gulp.dest tells Gulp where to output the files once the task is completed.
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    del = require('del'),
    panini = require('panini'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    runSequence = require('run-sequence'),
    minify = require('gulp-minify'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    minifyHTML   = require('gulp-minify-html');

// ------------ Optimization Tasks -------------
// Using panini, template, page and partial files are combined to form html markup
gulp.task('compile-html', function () {
    return gulp.src('src/pages/**/*.html')
        .pipe(panini({
            root: 'src/pages/',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            helpers: 'src/helpers/',
            data: 'src/data/'
        }))
        .pipe(gulp.dest('dist'));
});

// Reset Panini's cache of layouts and partials
gulp.task('resetPages', (done) => {
    panini.refresh();
    done();
    console.log('Clearing panini cache');
});

// Places font files in the dist folder
gulp.task('font', function () {
    return gulp.src('src/assets/fonts/**/*.+(eot|woff|ttf|otf)')
        .pipe(gulp.dest("dist/assets/fonts"))
        .pipe(browserSync.stream());
});

// Cleaning/deleting files no longer being used in dist folder
gulp.task('clean:dist', function () {
    console.log('Removing old files from dist');
    return del.sync('dist');
});

// ------------ Development Tasks -------------
// Compile Sass into CSS
gulp.task('sassD', function () {
    return gulp.src(['src/assets/scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: 'map',
            sourceMap: 'sass',
            outputStyle: 'nested'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cssnano()) // Use cssnano to minify CSS
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('scriptsD', function () {
    return gulp.src('src/assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('./'))
        .pipe(minify())
        .pipe(gulp.dest('dist/assets/js/'))
        .pipe(browserSync.stream());
});

// Copies image files to dist
gulp.task('imagesD', function () {
    return gulp.src('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin ([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))) // Caching images that ran through imagemin
        .pipe(gulp.dest('dist/assets/img/'));
});

// Watches for changes while gulp is running
gulp.task('watch', ['sassD'], function () {
    // Live reload with BrowserSync
    browserSync.init({
        server: "./dist"
    });

    gulp.watch(['src/assets/js/**/*.js'], ['scriptsD', browserSync.reload]);
    gulp.watch(['src/assets/scss/**/*'], ['sassD', browserSync.reload]);
    gulp.watch(['src/assets/img/**/*'], ['imagesD']);
    gulp.watch(['src/**/*.html'], ['resetPages', 'compile-html', browserSync.reload]);
    console.log('Watching for changes');
});

// ------------ Product Tasks -------------
// Compile Sass into CSS
gulp.task('sass', function () {
    return gulp.src(['src/assets/scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({ 
            outputStyle: 'expanded',
            sourceComments: 'map',
            sourceMap: 'sass',
            outputStyle: 'nested'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cssnano()) // Use cssnano to minify CSS
        .pipe(sourcemaps.write('./'))
        .pipe(rev())
        .pipe(gulp.dest("dist/assets/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/css'))
        .pipe(browserSync.stream());
});

// Concatenating js files
gulp.task('scripts', function () {
    return gulp.src('src/assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('./'))
        .pipe(minify())
        .pipe(rev())
        .pipe(gulp.dest('dist/assets/js/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js'))
        .pipe(browserSync.stream());
});

// Copies image files to dist
gulp.task('images', function () {
    return gulp.src('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin ([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))) // Caching images that ran through imagemin
        .pipe(rev())
        .pipe(gulp.dest('dist/assets/img/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/img'));
});

gulp.task('revHTML', function () {
    return gulp.src(['dist/rev/**/*.json', 'dist/*.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'assets/css': 'https://ovay-static.s3.ap-south-1.amazonaws.com/assets/css',
                'assets/js': 'https://ovay-static.s3.ap-south-1.amazonaws.com/assets/js',
                'assets/img': 'https://ovay-static.s3.ap-south-1.amazonaws.com/assets/img',
            }
        }))
        // .pipe(minifyHTML({
        //     empty: true,
        //     spare: true,
        //     quotes: true
        // }))
        .pipe(gulp.dest('dist'))
})

gulp.task('revCSS', function () {
    return gulp.src(['dist/rev/**/*.json', 'dist/assets/css/*.css'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                '/assets/img': 'https://ovay-static.s3.ap-south-1.amazonaws.com/assets/img',
            }
        }))
        .pipe(gulp.dest('dist/assets/css'))
})

gulp.task('rev', function () {
    runSequence('revCSS', 'revHTML')
})

// ------------ Build Sequence -------------
// Simply run 'gulp' in terminal to run local server and watch for changes
gulp.task('default', ['clean:dist', 'font', 'scriptsD', 'imagesD', 'compile-html', 'resetPages', 'watch']);

// Creates production ready assets in dist folder
gulp.task('build', function () {
    console.log('Building production ready assets');
    runSequence('clean:dist', 'sass', ['scripts', 'images', 'font', 'compile-html'], 'rev')
});

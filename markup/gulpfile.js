'use strict';


var fs = require('fs');
var nodePath = require('path');
var Transform = require('stream').Transform;


// Minimal replacement for the (unmaintained, vulnerable) gulp-rigger plugin:
// resolves `//= relative/path.ext` include directives relative to the file
// containing them. Only single-level includes are used in src/, so no
// recursion is needed.
function include() {
    return new Transform({
        objectMode: true,
        transform: function (file, enc, cb) {
            if (file.isBuffer()) {
                var baseDir = nodePath.dirname(file.path);
                var contents = file.contents.toString().replace(
                    /^([ \t]*)\/\/=\s*(.+?)\s*$/gm,
                    function (match, indent, includePath) {
                        var includeFile = nodePath.join(baseDir, includePath);
                        return fs.readFileSync(includeFile, 'utf8');
                    }
                );
                file.contents = Buffer.from(contents);
            }
            cb(null, file);
        }
    });
}


// Minimal replacement for the gulp-imagemin/imagemin-pngquant/imagemin-jpeg-recompress
// stack, which pulls in a large tree of unmaintained, vulnerable binary-downloader
// packages. sharp has no such dependencies and covers the jpg/png/svg used here.
function compressImages() {
    return new Transform({
        objectMode: true,
        transform: function (file, enc, cb) {
            if (!file.isBuffer()) {
                return cb(null, file);
            }
            var ext = nodePath.extname(file.path).toLowerCase();
            var sharp = require('sharp');
            var image = sharp(file.contents);
            var task;
            if (ext === '.jpg' || ext === '.jpeg') {
                task = image.jpeg({ quality: 80, progressive: true, mozjpeg: true });
            } else if (ext === '.png') {
                task = image.png({ quality: 80, compressionLevel: 9, palette: true });
            } else {
                return cb(null, file);
            }
            task.toBuffer()
                .then(function (data) {
                    // only use the recompressed version if it's actually smaller
                    if (data.length < file.contents.length) {
                        file.contents = data;
                    }
                    cb(null, file);
                })
                .catch(function () {
                    // fall back to the original file if sharp can't process it
                    cb(null, file);
                });
        }
    });
}


var path = {
    build: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/images/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/scss/main.scss',
        img: 'src/sourceimages/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/scss/**/*.scss',
        img: 'src/sourceimages/**/*.*',
        fonts: 'srs/fonts/**/*.*'
    },
    clean: './dist/*'
};


var config = {
    server: {
        baseDir: './dist',
        index: "index.html",
        directory: true
    },
    notify: true
};


var gulp = require('gulp'),
    webserver = require('browser-sync'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer').default,
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename');




gulp.task('webserver', function () {
    webserver(config);
});


gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(include())
        .pipe(gulp.dest(path.build.html))
        .pipe(webserver.reload({ stream: true }));
});


gulp.task('css:build', function () {
    return gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.css))
        .pipe(webserver.reload({ stream: true }));
});

gulp.task('css:dist', function () {
    return gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.build.css))
});


gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(include())
        .pipe(gulp.dest(path.build.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.js))
        .pipe(webserver.reload({ stream: true }));
});

gulp.task('js:dist',  function () {
    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(include())
        .pipe(gulp.dest(path.build.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
});


gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts, { encoding: false })
        .pipe(gulp.dest(path.build.fonts));
});


gulp.task('image:build', function () {
    return gulp.src(path.src.img, { encoding: false })
        .pipe(compressImages())
        .pipe(gulp.dest(path.build.img));
});


gulp.task('clean:build', function () {
    return gulp.src(path.clean, { read: false })
        .pipe(rimraf());
});


gulp.task('build',
    gulp.series('clean:build',
        gulp.parallel(
            'html:build',
            'css:build',
            'js:build',
            'fonts:build',
            'image:build'
        )
    )
);

gulp.task('dist',
    gulp.series('clean:build',
        gulp.parallel(
            'html:build',
            'css:dist',
            'js:dist',
            'fonts:build',
            'image:build'
        )
    )
);


gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.css, gulp.series('css:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});


gulp.task('default', gulp.series(
    'build',
    gulp.parallel('webserver','watch')      
));

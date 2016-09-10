"use strict";

// General
var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var plumber = require("gulp-plumber");
var reload = browserSync.reload;

// Scripts and tests
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");
var uglify = require("gulp-uglify");

// Styles
var minify = require("gulp-cssnano");
var prefix = require("gulp-autoprefixer");

// Images
var imagemin = require("gulp-imagemin");

// Paths to project folders
var paths = {
    input: "src/**/*",
    output: "dist/",
    images: {
        input: "src/img/**/*",
        output: "dist/img/"
    },
    scripts: {
        input: "src/js/**/*",
        output: "dist/js/"
    },
    static: {
        input: "src/static/**/*",
        output: "dist/"
    },
    styles: {
        input: "src/styles/**/*.css",
        output: "dist/styles/"
    }
};

// Gulp Tasks
// Copy and optimize image files into output folder
gulp.task("build:images", ["clean:images"], function() {
    return gulp.src(paths.images.input)
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [ {removeViewBox:false}, {removeUselessStrokeAndFill:false} ]
        }))
        .pipe(gulp.dest(paths.images.output))
        .pipe(reload({stream:true}));
});

// Lint, minify, and concatenate scripts
gulp.task("build:scripts", ["clean:scripts", "lint:scripts"], function() {
    return gulp.src(paths.scripts.input)
        .pipe(plumber())
        .pipe(uglify({mangle: {toplevel: true}}))
        .pipe(gulp.dest(paths.scripts.output))
        .pipe(reload({stream:true}));
});

// Copy and minify static files into output folder
gulp.task("build:static", ["clean:static"], function() {
    return gulp.src(paths.static.input)
        .pipe(plumber())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.static.output))
        .pipe(reload({stream:true}));
});

// Process, lint, and minify style files
gulp.task("build:styles", ["clean:styles"], function() {
    return gulp.src(paths.styles.input)
        .pipe(plumber())
        .pipe(prefix({
            browsers: ["last 2 version", "> 1%"],
            cascade: true,
            remove: true
        }))
        .pipe(minify({discardComments: {removeAll: true}}))
        .pipe(gulp.dest(paths.styles.output))
        .pipe(reload({stream:true}));
});

// Remove pre-existing content from output folders
gulp.task("clean:dist", function () {
    del.sync([
        paths.output
    ]);
});

gulp.task("clean:images", function () {
    del.sync([
        paths.images.output
    ]);
});

gulp.task("clean:scripts", function () {
    del.sync([
        paths.scripts.output
    ]);
});

gulp.task("clean:static", function () {
    del.sync([
        "dist/*.*"
    ]);
});

gulp.task("clean:styles", function () {
    del.sync([
        paths.styles.output
    ]);
});

// Lint scripts
gulp.task("lint:scripts", function () {
    return gulp.src(paths.scripts.input)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("watch", function () {
    gulp.watch(paths.images.input, ["build:images"]);
    gulp.watch(paths.scripts.input, ["build:scripts"]);
    gulp.watch(paths.static.input, ["build:static"]);
    gulp.watch(paths.styles.input, ["build:styles"]);
});

// Compile files
gulp.task("build", [
    "clean:dist",
    "build:images",
    "build:scripts",
    "build:static",
    "build:styles",
]);

// Serve
gulp.task("serve", ["build", "watch"], function () {
    browserSync.init({
        logPrefix: "ulterius",
        server: "dist"
    });
});

// Default
gulp.task("default", [
    "serve"
]);

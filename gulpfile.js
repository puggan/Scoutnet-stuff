"use strict";

const gulp = require("gulp");
const plug = require("gulp-load-plugins")({
    rename: {
        "gulp-cssnano": "uglifycss",
    },
});

//<editor-fold desc="IDE help only">
// noinspection ConstantIfStatementJS just here for ide inspection help
if (false) {
    // noinspection UnreachableCodeJS just here for ide inspection help
    plug.ignore = require("gulp-ignore");
    plug.less = require("gulp-less");
    plug.plumber = require("gulp-plumber");
    plug.rename = require("gulp-rename");
    plug.sourcemaps = require("gulp-sourcemaps");
    plug.uglifycss = require("gulp-cssnano");

}
//</editor-fold>

gulp.task("default", ["css"]);
gulp.task(
    "css",
    [],
    () => gulp
        .src("less/*.less")
        .pipe(plug.plumber())
        .pipe(plug.sourcemaps.init())

        .pipe(plug.less())
        .pipe(plug.sourcemaps.mapSources(p => "../less/" + p))
        .pipe(plug.sourcemaps.write("./", {includeContent: false}))
        .pipe(gulp.dest("css/"))
        .pipe(plug.ignore.exclude("*.map"))

        .pipe(plug.uglifycss())
        .pipe(plug.rename({extname: '.min.css'}))
        .pipe(plug.sourcemaps.write("./", {includeContent: false}))
        .pipe(gulp.dest("css/")),
);

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
//    babel = require("gulp-babel"),
    autoprefixer = require("gulp-autoprefixer"),
    clean = require("gulp-clean-css"),
    //jade = require("gulp-jade"),
    sourcemaps = require("gulp-sourcemaps"),
    livereload = require("gulp-livereload"),
    imageResize = require("gulp-image-resize"),
    plumber = require("gulp-plumber");


//gulp.task("default", ["connect", "watch"]);
gulp.task("default", ["watch"]);

//gulp.task("connect", function(){
//    connect.server({
//        root: "./public/",
//        //port: 8001,
//        livereload: true
//    });
//})

gulp.task("scss", function () {
    console.log("good");
    gulp.src([
//        "./bower_components/uikit/scss/uikit.scss",
            "./scss/**/*.scss"
//        "./scss/fontcss/*.css"
        ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: [
            "./bower_components/uikit/scss"
        ]}))
        .pipe(concat("app.css"))
        .pipe(autoprefixer({
            browser: ["last 2 versions"],
            cascade: false
        }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest("./public/css"))
        .pipe(livereload({start: true}));
});


gulp.task("makejs", function () {
    gulp.src([
            "./bower_components/jquery/dist/jquery.min.js",
            "./bower_components/uikit/js/uikit.min.js",
            "./bower_components/uikit/js/components/slideshow.min.js",
            "./bower_components/uikit/js/components/grid.min.js",
            "./bower_components/uikit/js/components/sticky.min.js",
            "./bower_components/uikit/js/components/lightbox.min.js",
            // "./bower_components/uikit/js/components/grid-parallax.min.js",
            "./bower_components/uikit/js/components/parallax.min.js",
            "./bower_components/uikit/js/components/accordion.min.js",
            // "./bower_components/masonry/dist/masonry.pkgd.min.js"
            //"./bower_components/uikit/js/components/modal.min.js",
            //"./bower_components/Snap.svg/dist/snap.svg-min.js",
            // "./scripts/graphics.js"
        ])
        .pipe(concat("app.js"))
        //    .pipe(babel({presets:["es2015"]}))
        // .pipe(uglify())
        .pipe(gulp.dest("./public/js"));
        //.pipe(livereload({start:true}));
});

gulp.task("minifycss", function(){
    gulp.src("./public/css/*.css")
        .pipe(clean())
        .pipe(gulp.dest("./public/css"));
});

gulp.task("compressjs", function () {
    gulp.src("./public/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./public/js"));
});

gulp.task("miniall", ["minifycss", "compressjs"]);

gulp.task('imgres', function () {
    gulp.src("./public/images/gallery/*")
        .pipe(imageResize({
            width: 305,
            height: 305,
            crop: true,
            upscale: false
        }))
        .pipe(gulp.dest('./public/images/gallery/thumbnails'));
});

gulp.task("tpwp", function() {
   //gulp.src("./public")
});

gulp.task("watch", function () {
    livereload.listen();
    gulp.watch(["./scss/**/*.scss"], ["scss"]);
    gulp.watch(["./scripts/*.js"], ["makejs"]);
});

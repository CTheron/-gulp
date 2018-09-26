# gulp-es3ify

[![Build Status](https://travis-ci.org/jussi-kalliokoski/gulp-es3ify.svg?branch=master)](https://travis-ci.org/jussi-kalliokoski/gulp-es3ify)
[![Coverage Status](https://img.shields.io/coveralls/jussi-kalliokoski/gulp-es3ify.svg)](https://coveralls.io/r/jussi-kalliokoski/gulp-es3ify)

This plugin is a simple convenience wrapper around [es3ify](https://github.com/spicyj/es3ify).

## Usage

```javascript
var es3ify = require("gulp-es3ify");

gulp.task("javascripts", function () {
    return gulp.src("src/index.js")
        .pipe(es3ify())
        .pipe(gulp.dest("dist"));
});
```

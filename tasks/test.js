const vfs = require("vinyl-fs");
const zip = require("gulp-zip");

const componentName = "test"

vfs.src('./dest/*')
  .pipe(zip(componentName + '.resource'))
  .pipe(vfs.dest('./pkg/staticresources'));
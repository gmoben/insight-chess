/*eslint-disable no-process-exit*/
import gulp from 'gulp';
import webpack from 'gulp-webpack';

const BUILD_DIR = 'dist';

gulp.task('copy', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('build', ['copy'], () => {
  return gulp.src('src/index.js')
    .pipe(webpack(require('./webpack')))
    .pipe(gulp.dest(BUILD_DIR));
});

export default gulp;

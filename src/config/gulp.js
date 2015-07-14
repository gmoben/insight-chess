/*eslint-disable no-process-exit*/
import path from 'path';

import del from 'del';
import gulp from 'gulp';
import webpack from 'gulp-webpack';

const BUILD_DIR = 'dist';

function build(src, dest=BUILD_DIR) {
  return gulp.src(src)
    .pipe(webpack(require('./webpack')))
    .pipe(gulp.dest(dest));
}

gulp.task('clean', () => {
  return del.sync(BUILD_DIR + '/**', {force: true});
});

gulp.task('copy', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('build', ['clean', 'copy'], () => {
  return build('src/index.js');
});

// import mocha from 'gulp-spawn-mocha';

// function test(src, reporter='spec', istanbul=true) {
//   return gulp.src(src)
//     .pipe(mocha({
//       env: {
//         NODE_PATH: config.ROOT
//       },
//       istanbul: istanbul,
//       reporter: reporter,
//       compilers: 'js:babel/register'
//     }))
//     .on('end', function() { this._child.kill('SIGHUP'); })
//     .once('error', err => {
//       throw err;
//     });
// }

// gulp.task('build:tests', 'Compile tests.', () => {
//   return build('lib/**/tests/**');
// });

// gulp.task('test', 'Default: test:lib only', ['test:lib']);
//
// gulp.task('test:all', 'Run all tests.', ['test:lib', 'test:build']);
//
// gulp.task('test:lib', 'Run uncompiled tests on uncompiled code.', () => {
//   return test('lib/server/**/*.spec.js');
// });
//
// gulp.task('test:build', 'Run compiled tests on compiled code.', ['build:tests'], () => {
//   return test(path.join(config.BUILD_DIR, '**/*.spec.js'), 'spec', false);
// });

export default gulp;

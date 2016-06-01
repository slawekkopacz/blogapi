var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

const paths = {
  js: ['./**/*.js', '!node_modules/**'],
  tests: ['./tests/**/*.js'],
};

gulp.task('lint', () => {
  return gulp.src(paths.js)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError())
    .once('end', () => {
      plugins.util.log('lint task completed.');
      process.exit(0);
    });
});

gulp.task('set-env-test', () => {
  plugins.env({
    vars: {
      NODE_ENV: 'test'
    }
  });
});

gulp.task('mocha', ['set-env-test'], () => {

  var exitCode = 0;
  return gulp.src(paths.tests, { read: false })
    .pipe(plugins.plumber())
    .pipe(plugins.mocha({
      reporter: plugins.util.env['mocha-reporter'] || 'spec',
    }))
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    });
});


//gulp.task('default', ['lint', 'mocha'], function () {
//  plugins.util.log('default task(s) completed.');
//});
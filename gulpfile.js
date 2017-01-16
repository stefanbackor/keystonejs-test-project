var gulp = require('gulp');
var watch = require('gulp-watch');
var shell = require('gulp-shell')
var sass = require('gulp-sass');

var spawn = require('child_process').spawn;
var node;


var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	}

};


gulp.task('sass', function(){
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.style.output));
});


gulp.task('runKeystone', function(){
  // shell.task('node keystone.js');
  if (node) node.kill()
  node = spawn('node', ['keystone.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});


gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('watch:keystone', function(){
  gulp.watch(paths.src, ['runKeystone']);
})


// Run all watch tasks
gulp.task('watch', [
  'watch:sass',
  'watch:keystone',
]);

gulp.task('default', ['watch', 'runKeystone']);

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})

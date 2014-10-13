/*
 * grunt-cocoonjs
 * https://github.com/yjx3097890/grunt-cocoonjs
 *
 * Copyright (c) 2014 yanjixian
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;
var path = require('path');

module.exports = function(grunt) {


  grunt.registerMultiTask('cocoonjs', 'The grunt plugin for cocoonjs.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      command: 'build',  //命令
      dir: 'cocoonjs',   //运行命令的目录
      dist: 'dist'
    });

    var done = this.async();

    var ops = {
      cwd : path.resolve(options.dir)
    };
    if ( !grunt.file.isDir(ops.cwd) ) {
      grunt.log.errorlns('dir( ' + ops.cwd + ') should be a directory.');
      return false;
    }
    var child = exec('cocoonjs ' + options.command, ops, function (error, stdout, stderr) {
      if ( error ) {
        grunt.log.errorlns('cocoonjs ' + error);
        done(false);
      }

      if (options.command === 'build') {

      var buildPath = 'platforms/android/ant-build';
      var files = grunt.file.expand(path.join(options.dir ,buildPath, '*.apk'));
      files.forEach(function (file) {
        grunt.file.copy(file, path.join(options.dist, path.basename(file)));
        grunt.log.writeln('create file ' + file);
      });
      
    }

      done();
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
        grunt.log.write(data);
    });


  });

};

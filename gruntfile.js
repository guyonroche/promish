'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [
          {
            expand: true,
            src: ['./lib/**/*.js'],
            dest: './build/'
          }
        ]
      }
    },
    browserify: {
      standalone: {
        src: ['./build/lib/promish-es2015.js'],
        dest: './dist/promish.js',
        options: {
          browserifyOptions: {
            standalone: 'Promish'
          }
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! Promish <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          './dist/promish.min.js': ['./dist/promish.js']
        }
      }
    }
  });

  grunt.registerTask('build', ['babel', 'browserify', 'uglify']);
};

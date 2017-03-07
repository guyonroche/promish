'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
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
      browser: {
        src: ['./build/lib/es6-promish.js'],
        dest: './dist/promish-bundle.js',
        options: {
          browserifyOptions: {
            standalone: 'Promish'
          }
        }
      },
      // node: {
      //   src: ['./build/lib/es6-promish.js'],
      //   dest: './dist/promish-node.js',
      //   options: {
      //     browserifyOptions: {
      //       standalone: 'Promish',
      //       builtins: false,
      //       commondir: false,
      //       'insert-global-vars': '__filename,__dirname',
      //       detectGlobals: false,
      //       'browser-field': false,
      //     }
      //   }
      // },
    },
    // concat: {
    //   options: {
    //     banner: '/*! Promish <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    //   },
    //   dist: {
    //     src: ['./build/lib/promish-class.js', './build/lib/es6-promish.js'],
    //     dest: 'dist/es6-promish.js',
    //   }
    // },
    copy: {
      'promish-node': { src: './build/lib/es6-promish.js', dest: './dist/promish-node.js' },
      'promish-class': { src: './build/lib/promish-class.js', dest: './dist/promish-class.js' },
    },
    uglify: {
      options: {
        banner: '/*! Promish <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          './dist/promish-bundle.min.js': ['./dist/promish-bundle.js'],
        }
      }
    }
  });

  grunt.registerTask('build', ['babel', 'browserify', 'copy', 'uglify']);
};

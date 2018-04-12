'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: [
          {
            expand: true,
            src: ['./lib/**/*.js', './spec/**/*.js'],
            dest: './build/'
          }
        ]
      }
    },
    browserify: {
      dist: {
        src: ['./build/lib/es6-promish.js'],
        dest: './dist/promish-bundle.js',
        options: {
          browserifyOptions: {
            standalone: 'Promish'
          }
        }
      },
      spec: {
        src: ['./build/spec/browser/promish-spec.js'],
        dest: './build/web/promish-spec.js'
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
      'promish': { src: './build/lib/promish.js', dest: './dist/promish.js' },
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
    },

    jasmine: {
      dev: {
        src: ['./dist/promish-bundle.js'],
        options: {
          specs: './build/web/promish-spec.js'
        }
      }
    }
  });

  grunt.registerTask('build', ['babel', 'browserify', 'copy', 'uglify']);
};

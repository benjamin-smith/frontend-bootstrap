module.exports = function(grunt) {

  var
    project    = '',
    scss       = project + 'src/scss/',
    coffee     = project + 'src/coffee/',
    components = project + 'src/components/',
    css        = project + 'dist/css/',
    js         = project + 'dist/js/';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: [css+"*"],

    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: scss,
          src: [
            "*.scss",
            "!_*.scss"
          ],
          dest: css,
          ext: '.css'
        }],
        options: {
          compass: true,
          cacheLocation: scss + '.sass_cache',
          style: 'expanded'
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          'dist/css/main.css': [
            css + 'main.css'
          ]
        }
      }
    },

    coffee: {
      compile: {
        files: {
          'dist/js/main.js': [
            coffee + 'main.coffee'
          ]
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          js + 'main.js'
        ],
        dest: js + 'main.js'
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: js,
          src: '*.js',
          dest: js
        }]
      }
    },

    jshint: {
      all: [js + '*.js']
    },

    watch: {
      scripts: {
        files: [coffee + '*.coffee'],
        tasks: ['coffee','concat','jshint','uglify']
      },
      styles: {
        files: [scss + '*.scss'],
        tasks: ['clean', 'sass', 'cssmin']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', 'def', function(){
    grunt.task.run('clean');
    grunt.task.run('sass');
    grunt.task.run('cssmin');
    grunt.task.run('coffee');
    grunt.task.run('concat');
    grunt.task.run('jshint');
    grunt.task.run('uglify');
  });

};

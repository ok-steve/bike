'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'handlebars'

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass']
      },
      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          '<%= config.app %>/*.html',
          '{.tmp,<%= config.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= config.app %>}/scripts/{,*/}*.js',
          '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
          '<%= config.app %>/scripts/templates/**/*.{ejs,mustache,hbs}',
          'test/spec/**/*.js'
        ]
      },
      handlebars: {
        files: [
          '<%= config.app %>/scripts/templates/**/*.hbs'
        ],
        tasks: ['handlebars']
      },
      test: {
        files: ['<%= config.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
        tasks: ['test:true']
      }
    },
    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        path: 'http://localhost:<%= connect.test.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= config.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
        }
      }
    },
    sass: {
      options: {
        loadPath: 'bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          baseUrl: '<%= config.app %>/scripts',
          optimize: 'none',
          paths: {
            'templates': '../../.tmp/scripts/templates',
            'jquery': '../../bower_components/jquery/dist/jquery',
            'underscore': '../../bower_components/lodash/dist/lodash',
            'backbone': '../../bower_components/backbone/backbone'
          },
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false,
          useStrict: true
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
        }
      }
    },
    useminPrepare: {
      html: '<%= config.app %>/index.html',
      options: {
        dest: '<%= config.dist %>'
      }
    },
    usemin: {
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= config.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= config.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= config.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: '*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,txt}',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*',
            'bower_components/bootstrap-sass-official/fonts/*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }]
      }
    },
    bower: {
      all: {
        rjsConfig: '<%= config.app %>/scripts/main.js'
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: 'JST',
          amd: true
        },
        files: {
          '.tmp/scripts/templates.js': ['<%= config.app %>/scripts/templates/**/*.hbs']
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '/styles/fonts/{,*/}*.*',
            'bower_components/bootstrap-sass-official'
          ]
        }
      }
    },
    buildcontrol: {
      options: {
        dir: '<%= config.dist %>',
        commit: true,
        push: true
      },
      dist: {
        options: {
          remote: '<%= pkg.repository.url %>',
          branch: 'gh-pages'
        }
      }
    }
  });

  grunt.registerTask('createDefaultTemplate', function () {
    grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve' + (target ? ':' + target : '')]);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
    }

    if (target === 'test') {
      return grunt.task.run([
        'clean:server',
        'createDefaultTemplate',
        'handlebars',
        'sass:server',
        'connect:test',
        //'open:test',
        'watch'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'createDefaultTemplate',
      'handlebars',
      'sass:server',
      'connect:livereload',
      //'open:server',
      'watch'
    ]);
  });

  grunt.registerTask('test', function (isConnected) {
    isConnected = Boolean(isConnected);
    var testTasks = [
        'clean:server',
        'createDefaultTemplate',
        'handlebars',
        'sass',
        'connect:test',
        'mocha',
      ];

    if(!isConnected) {
      return grunt.task.run(testTasks);
    } else {
      // already connected so not going to connect again, remove the connect:test task
      testTasks.splice(testTasks.indexOf('connect:test'), 1);
      return grunt.task.run(testTasks);
    }
  });

  grunt.registerTask('deploy', [
    'build',
    'buildcontrol'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'createDefaultTemplate',
    'handlebars',
    'sass:dist',
    'useminPrepare',
    'requirejs',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};

// Generated on 2015-12-30 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Automatically load required Grunt tasks
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin',
		ngtemplates: 'grunt-angular-templates',
		cdnify: 'grunt-google-cdn'
	});

	// Configurable paths for the application
	var appConfig = {
		app: 'client',
		dist: 'dist',
		tmp: '.tmp'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: appConfig,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json', 'bower_components/*'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= yeoman.app %>/app/**/*.js'],//'<%= yeoman.app %>/app/**/*.js'
				tasks: ['newer:jshint:all', 'newer:jscs:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			jsTest: {
				files: ['test/spec/{,*/}*.js'],
				tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
			},
			compass: {
				files: ['<%= yeoman.app %>/assets/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass:server', 'postcss:server']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= yeoman.app %>/assets/styles/**.scss',
					'<%= yeoman.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				],
				tasks: ['clean:tmp', 'copy:index', 'includeSource:server', 'wiredep']
			},
			includeSource: {
				files: [
					'<%= yeoman.app %>/app/**/*.js',
					"!Gruntfile.js"
				],
				tasks: ['clean:tmp', 'copy:index', 'includeSource:server', 'wiredep'],
				options: {
					event: ['added', 'deleted']
				}
			}
		},

		// Include sources js-files into index.html
		includeSource: {
			options: {
				basePath: '<%= yeoman.app %>'
			},
			server: {
				files: {
					'<%= yeoman.tmp %>/index.html': '<%= yeoman.app %>/index.html'
				}
			},
			dist: {
				files: {
					'<%= yeoman.dist %>/index.html': '<%= yeoman.app %>/index.html'
				}
			},
			tmp: {
				files: {
					'<%= yeoman.tmp %>/index.html': '<%= yeoman.tmp %>/index.html'
				}
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					middleware: function (connect) {
						return [
							connect.static('.tmp'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect().use(
								'/client/assets/styles',
								connect.static('./client/assets/styles')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			test: {
				options: {
					port: 9001,
					middleware: function (connect) {
						return [
							connect.static('.tmp'),
							connect.static('test'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= yeoman.dist %>'
				}
			}
		},

		// Make sure there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'<%= yeoman.app %>/app/**/*.js'
				]
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/{,*/}*.js']
			}
		},

		// Make sure code styles are up to par
		jscs: {
			options: {
				config: '.jscsrc',
				verbose: true
			},
			all: {
				src: [
					'Gruntfile.js',
					'<%= yeoman.app %>/app/**/*.js'
				]
			},
			test: {
				src: ['test/spec/{,*/}*.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/{,*/}*',
						'!<%= yeoman.dist %>/.git{,*/}*'
					]
				}]
			},
			server: '.tmp',
			tmp: '<%= yeoman.tmp %>/index.html'
		},

		// Add vendor prefixed styles
		postcss: {
			options: {
				processors: [
					require('autoprefixer-core')({browsers: ['last 1 version']})
				]
			},
			server: {
				options: {
					map: true
				},
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: ['<%= yeoman.app %>/index.html', '<%= yeoman.tmp %>/index.html'],
				ignorePath: /\.\.\//
			},
			test: {
				devDependencies: true,
				src: '<%= karma.unit.configFile %>',
				ignorePath: /\.\.\//,
				fileTypes: {
					js: {
						block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
						detect: {
							js: /'(.*\.js)'/gi
						},
						replace: {
							js: '\'{{filePath}}\','
						}
					}
				}
			},
			sass: {
				src: ['<%= yeoman.app %>/assets/styles/{,*/}*.{scss,sass}'],
				ignorePath: /(\.\.\/){1,2}bower_components\//
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/assets/styles',
				cssDir: '.tmp/styles',
				generatedImagesDir: '.tmp/images/generated',
				imagesDir: '<%= yeoman.app %>/assets/images',
				javascriptsDir: '<%= yeoman.app %>/app',
				fontsDir: '<%= yeoman.app %>/styles/fonts',
				importPath: './bower_components',
				httpImagesPath: '/images',//httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/styles/fonts',
				relativeAssets: false,
				assetCacheBuster: false,
				raw: 'Sass::Script::Number.precision = 10\n'
			},
			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/images/generated'
				}
			},
			server: {
				options: {
					sourcemap: true
				}
			}
		},

		// Renames files for browser caching purposes
		filerev: {
			dist: {
				src: [
					'<%= yeoman.dist %>/scripts/{,*/}*.js',
					'<%= yeoman.dist %>/styles/{,*/}*.css',
					'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= yeoman.dist %>/styles/fonts/*'
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= yeoman.tmp %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.tmp %>/{,*/}*.html'],
			css: ['<%= yeoman.tmp %>/styles/{,*/}*.css'],
			js: ['<%= yeoman.tmp %>/scripts/{,*/}*.js'],
			options: {
				assetsDirs: [
					'<%= yeoman.dist %>',
					'<%= yeoman.dist %>/images',
					'<%= yeoman.dist %>/styles'
				],
				patterns: {
					js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
				}
			}
		},

		// The following *-min tasks will produce minified files in the dist folder
		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= yeoman.dist %>/styles/main.css': [
		//         '.tmp/styles/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		 uglify: {
           main:{
               files:{
                   '<%= yeoman.dist %>/scripts/scripts.js':'<%= yeoman.tmp %>/concat/scripts/scripts.js'
               }
           },
             template: {
                 files: {
                     '<%= yeoman.tmp %>/concat/scripts/template.js': '<%= yeoman.tmp %>/templateCache.js'
                 }
             },
		   dist: {
		     files: {
		       '<%= yeoman.dist %>/scripts/scripts.js': [
		         '<%= yeoman.dist %>/scripts/scripts.js'
		       ]
		     }
		   }
		 },
        concat: {
            options: {
                // Use �;� as concat separator only for js-files
                process: function (src, filepath) {
                    if (filepath.split(/\./).pop() === 'js') {
                        return src + ';\n';
                    }
                    return src;
                }
            }
        },

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/assets/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/assets/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: ['*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		ngtemplates: {
			dist: {
				options: {
					module: 'yoNewAngularApp',
					htmlmin: '<%= htmlmin.dist.options %>',
					usemin: 'scripts/template.js'
				},
				cwd: '<%= yeoman.app %>',
				src: 'app/**/*.html',
				dest: '.tmp/templateCache.js'
			}
		},

		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= yeoman.dist %>/*.html']
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'*.html',
						'images/{,*/}*.{webp}',
						'styles/fonts/{,*/}*.*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: ['generated/*']
				}, {
					expand: true,
					cwd: '.',
					src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
					dest: '<%= yeoman.dist %>'
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/assets/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			},
			index: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: 'index.html',
					dest: '<%= yeoman.tmp %>/'
				}]
			},
            tmp: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.tmp %>',
                    src: 'index.html',
                    dest: '<%= yeoman.dist %>/'
                }]
            }
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'compass:server'
			],
			test: [
				'compass'
			],
			dist: [
				'compass:dist',
				'imagemin',
				'svgmin'
			]
		},

		// Test settings
		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				singleRun: true
			}
		}
	});


	grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'concurrent:server',
			'postcss:server',
			'includeSource:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'wiredep',
		'concurrent:test',
		'postcss',
		'connect:test',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'clean:tmp',
		'copy:index',
        'includeSource:server',
        'wiredep',
        'useminPrepare',
        'concat',
        'concurrent:dist',
        'postcss',
        'ngtemplates',
		'ngAnnotate',
		'copy:dist',
		'cdnify',
		'cssmin',
		'uglify',
        'uglify:main',
        'uglify:template',
        'filerev',
		'usemin',
		'htmlmin',
        'copy:tmp'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'newer:jscs',
		'test',
		'build'
	]);
};

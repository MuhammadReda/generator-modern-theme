'use strict';
var _ = require('underscore');

module.exports = function(grunt) {

    var themeConfigFile = 'themeConfig.json';
    var themeConfig = grunt.file.readJSON(themeConfigFile);
    var tasks = {};

    tasks['watch'] = {
        options: {
            livereload: true
        },
        html: {
            files: ['app/**/*.html']
        },
        markdown: {
            files: ['app/md-content/**/*.md'],
            tasks: ['markdown']
        }
    };
    tasks['cssmin'] = {};
    tasks['uglify'] = {
        options: {
            mangle: false
        }
    };
    tasks['concat'] = {
        options: {
            separator: '\n'
        }
    };

    // watch for themeConfigFile changes
    tasks.watch['themeConfigFile'] = {
        files: themeConfigFile,
        tasks: ['defaultRoutine']
    };

    _.each(themeConfig.sources.js, function(item, index, list) {
        var key = 'js_' + index;
        var tempFile = '.tmp/js/' + index + '.min.js';
        var outputFile = themeConfig.destinations.js + '/' + index + '.min.js';

        tasks.concat[key] = {};
        tasks.concat[key]['src'] = item;
        tasks.concat[key]['dest'] = tempFile;
        
        tasks.uglify[key] = {};
        tasks.uglify[key]['files'] = {};
        tasks.uglify[key]['files'][outputFile] = tempFile;

        if(_.indexOf(themeConfig.watch.js, index) > -1) {
            tasks.watch[key] = {};
            tasks.watch[key].files = item;
            tasks.watch[key].tasks = [
                'concat:' + key,
                'uglify:' + key
            ];
        }
    });


    _.each(themeConfig.sources.css, function(item, index, list) {
        var key = 'css_' + index;
        var tempFile = '.tmp/css/' + index + '.min.css';
        var outputFile = themeConfig.destinations.css + '/' + index + '.min.css';

        tasks.concat[key] = {};
        tasks.concat[key]['src'] = item;
        tasks.concat[key]['dest'] = tempFile;

        tasks.cssmin[key] = {};
        tasks.cssmin[key]['files'] = {};
        tasks.cssmin[key]['files'][outputFile] = tempFile;

        if(_.indexOf(themeConfig.watch.css, index) > -1) {
            tasks.watch[key] = {};
            tasks.watch[key].files = item;
            tasks.watch[key].tasks = [
                'concat:' + key,
                'cssmin:' + key
            ];
        }
    });

    tasks['compass'] = {};
    _.each(themeConfig.sources.sass, function (item, index, list) {
        var key = 'sass_' + index;
        tasks.compass[key] = {
            options: {
                sassDir: item,
                cssDir: themeConfig.destinations.css,
                javascriptsDir: themeConfig.destinations.js,
                imagesDir: themeConfig.destinations.images,
                outputStyle: 'compressed'
            }
        };

        if(_.indexOf(themeConfig.watch.sass, index) > -1) {
            tasks.watch[key] = {};
            tasks.watch[key].files = item + '/**/*.{scss,sass}';
            tasks.watch[key].tasks = [
                    'compass:' + key
            ];
        }
    });

    if(_.isEmpty(tasks.compass))
        tasks.compass['dummyTarget'] = {};

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt, {
        scope: ['devDependencies']
    });

    // provide dummyTarget for empty tasks to prevent grunt from failing
    if(_.isEmpty(tasks.concat))
        tasks.concat['dummyTarget'] = {};
    if(_.isEmpty(tasks.uglify))
        tasks.uglify['dummyTarget'] = {};
    if(_.isEmpty(tasks.cssmin))
        tasks.cssmin['dummyTarget'] = {};
    if(_.isEmpty(tasks.watch))
        tasks.watch['dummyTarget'] = {};

    grunt.initConfig({
        clean: {
            temp: [
                '.tmp/*',
                '.sass-cache/*'
            ],
            build: [
                themeConfig.destinations.js + '/*',
                themeConfig.destinations.css + '/*',
                themeConfig.destinations.images + '/*',
                'app/views/content/**/*.html'
            ]
        },

        
        imagemin: {
            options: {
                optimizationLevel: 3, // .png
                progressive: true, // .jpg
                interlaced: true // .gif
            },
            target: {
                expand: true,
                cwd: themeConfig.sources.images,
                src: ['**/*.{png,gif,jpg,jpeg}'],
                dest: themeConfig.destinations.images
            }
        },
        

        concat: tasks.concat,

        compass: tasks.compass,

        uglify: tasks.uglify,

        cssmin: tasks.cssmin,

        watch: tasks.watch,

        markdown: {
            target: {
                options: {
                    template: 'app/md-content/template.jst',
                    markdownOptions: {
                        highlight: 'manual',
                        codeLines: {
                            before: '<span class="md-generated-codeLine">',
                            after: '</span>'
                        }
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: 'app/md-content',
                        src: '**/*.md',
                        dest: 'app/views/content',
                        ext: '.html'
                    }
                ]
            }
        },

        connect: {
            server: {
                options: {
                    port: 9099,
                    base: 'app',
                    keepalive: false
                }
            }
        },

        'gh-pages': {
            options: {
                base: 'app',
                push: true,
                branch: 'gh-pages',
                message: 'Auto-generated commit by Grunt.'
            },
            src: [
                'index.html',
                'views/**/*.*',
                'assets/**/*.*'
            ]
        }
    });

    grunt.registerTask('default', ['clean', 'defaultRoutine', 'clean:temp']);
    grunt.registerTask('defaultRoutine', ['markdown', 'concat', 'uglify', 'cssmin', 'compass', 'imagemin']);
    grunt.registerTask('server', ['defaultRoutine', 'connect', 'watch']);
};

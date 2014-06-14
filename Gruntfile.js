'use strict';
var _ = require('underscore');

module.exports = function(grunt) {

    var tasks = {};
    tasks['concat'] = {
        options: {
            separator: '\n'
        }
    };

    var themeConfig = grunt.file.readJSON('themeConfig.json');
    _.each(themeConfig.sources.js, function(item, index, list) {
        tasks.concat['js-' + index] = {};
        tasks.concat['js-' + index]['src'] = item;
        tasks.concat['js-' + index]['dest'] = '.tmp/js/' + index + '.min.js';
    });
    _.each(themeConfig.sources.css, function(item, index, list) {
        tasks.concat['css-' + index] = {};
        tasks.concat['css-' + index]['src'] = item;
        tasks.concat['css-' + index]['dest'] = '.tmp/css/' + index + '.min.css';
    });



    require('load-grunt-tasks')(grunt, {
        scope: ['devDependencies']
    });

    grunt.initConfig({
        clean: {
            temp: [
                '.tmp/*',
                '.sass-cache/*'
            ],
            build: [
                'assets/js/*',
                'assets/css/*'
            ]
        },

        compass: {
            target: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        concat: tasks.concat,

        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '.tmp/js/',
                    src: '**/*.js',
                    dest: themeConfig.destinations.js
                }]
            }
        },

        cssmin: {
            target: {
                expand: true,
                cwd: '.tmp/css/',
                src: '**/*.css',
                dest: themeConfig.destinations.css
            }
        },

        watch: {
            scss: {
                files: themeConfig.sources.scss + '/**/*.scss',
                tasks: ['compass']
            }
        }
    });

    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'cssmin']);
};
'use strict';
var _ = require('underscore');

module.exports = function(grunt) {

    var tasks = {};
    tasks['concat'] = {
        options: {
            separator: '\n'
        }
    };
    tasks['cssmin'] = {};

    var themeConfig = grunt.file.readJSON('themeConfig.json');
    _.each(themeConfig.sources.js, function(item, index, list) {
        tasks.concat[index] = {};
        tasks.concat[index]['src'] = item;
        tasks.concat[index]['dest'] = '.tmp/js/' + index + '.min.js';
    });
    _.each(themeConfig.sources.css, function(item, index, list) {
        tasks.cssmin[index] = {};
        tasks.cssmin[index]['files'] = {};
        tasks.cssmin[index]['files'][themeConfig.destinations.css + '/' + index + '.min.css'] = item;
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

        cssmin: tasks.cssmin,

        watch: {
            scss: {
                files: themeConfig.sources.scss + '/**/*.scss',
                tasks: ['compass']
            }
        }
    });

    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'cssmin']);
};
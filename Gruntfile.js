'use strict';
var _ = require('underscore');

module.exports = function(grunt) {

    var tasks = {};
    var themeConfig = grunt.file.readJSON('themeConfig.json');
    var watch_js = themeConfig.watch.js;

    tasks['watch'] = {};

    tasks['concat'] = {
        options: {
            separator: '\n'
        }
    };
    _.each(themeConfig.sources.js, function(item, index, list) {
        var key = 'js_' + index;
        tasks.concat[key] = {};
        tasks.concat[key]['src'] = item;
        tasks.concat[key]['dest'] = '.tmp/js/' + index + '.min.js';

        if(_.indexOf(watch_js, index) > -1) {
            tasks.watch[key] = {};
            tasks.watch[key].files = item;
            tasks.watch[key].tasks = ['concat:' + key, 'uglify'];
        }
    });

    console.log(tasks.watch);

    tasks['cssmin'] = {};
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

        watch: tasks.watch

//        watch: {
//            scss: {
//                files: themeConfig.sources.scss + '/**/*.scss',
//                tasks: ['compass']
//            }
//        }
    });

    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'cssmin']);
};
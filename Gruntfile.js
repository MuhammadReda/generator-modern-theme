'use strict';
var _ = require('underscore');

module.exports = function(grunt) {

    var tasks = {};
    var themeConfig = grunt.file.readJSON('themeConfig.json');

    tasks['watch'] = {};

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
    _.each(themeConfig.sources.js, function(item, index, list) {
        var key = 'js_' + index;
        var tempJs = '.tmp/js/' + index + '.min.js';
        var uglifiedJs = themeConfig.destinations.js + '/' + index + '.min.js';

        tasks.concat[key] = {};
        tasks.concat[key]['src'] = item;
        tasks.concat[key]['dest'] = tempJs;
        
        tasks.uglify[key] = {};
        tasks.uglify[key]['files'] = {};
        tasks.uglify[key]['files'][uglifiedJs] = tempJs;

        if(_.indexOf(themeConfig.watch.js, index) > -1) {
            tasks.watch[key] = {};
            tasks.watch[key].files = item;
            tasks.watch[key].tasks = ['concat:' + key, 'uglify:' + key];
        }
    });


    tasks['cssmin'] = {};
    _.each(themeConfig.sources.css, function(item, index, list) {
        var key = 'css_' + index;
        tasks.cssmin[key] = {};
        tasks.cssmin[key]['files'] = {};
        tasks.cssmin[key]['files'][themeConfig.destinations.css + '/' + index + '.min.css'] = item;

        if(_.indexOf(themeConfig.watch.css, index) > -1) {
            tasks.watch[key] = {};
            tasks.watch[key].files = item;
            tasks.watch[key].tasks = ['cssmin:' + key];
        }
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

        uglify: tasks.uglify,

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
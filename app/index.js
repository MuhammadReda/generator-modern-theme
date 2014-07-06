'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

/**
 * Custom options:
 *      * --theme-drupal-7
 *          To clone drupal theme files.
 */


var ModernThemeGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                // change directory before installing dependencies
                process.chdir(process.cwd() + '/' + this.projectName);

                this.installDependencies({
                    npm: true,
                    bower: true
                });
            }
        });
    },

    askFor: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous ModernTheme generator!'));
        this.log('Out of the box, I compress and minify js and css files. And I do provide few more options');

        var prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'Your project name',
                default: this.appname
            },
            {
                type: 'input',
                name: 'themeFolder',
                message: 'Your theme folder',
                default: 'theme'
            },
            {
                type: 'input',
                name: 'bowerFolder',
                message: 'Bower Components folder',
                default: 'bower_components'
            },
            {
                type: 'confirm',
                name: 'useModernizr',
                message: 'Would you like to use Modernizr?',
                default: true
            },
            {
                type: 'confirm',
                name: 'useFoundation',
                message: 'Would you like to use Foundation SASS Library?',
                default: true
            },
            {
                type: 'confirm',
                name: 'useCompass',
                message: 'Would you like to use Compass for SASS?',
                default: true
            },
            {
                type: 'confirm',
                name: 'useImagemin',
                message: 'Would you like to have your images minified?',
                default: true
            }
        ];

        this.prompt(prompts, function (props) {
            this.projectName = props.projectName;
            this.themeFolder = props.themeFolder;
            this.bowerFolder = props.bowerFolder;

            this.useModernizr = props.useModernizr;
            this.useFoundation = props.useFoundation;
            this.useCompass = props.useCompass;
            this.useImagemin = props.useImagemin;

            done();
        }.bind(this));
    },

    app: function () {
        var _baseFolder = this.projectName + '/';

        this.mkdir(this.projectName);
        this.mkdir(_baseFolder + this.themeFolder);

        this.template('bowerrc', _baseFolder + '.bowerrc');
        this.template('_bower.json', _baseFolder + 'bower.json');
        this.template('_package.json', _baseFolder + 'package.json');
    },

    projectfiles: function () {
        var _baseFolder = this.projectName + '/';
        var _themeFolder = this.themeFolder;

        this.copy('editorconfig', _baseFolder + '.editorconfig');

        this.template('_Gruntfile.js', _baseFolder + 'Gruntfile.js');
        this.template('_themeConfig.json', _baseFolder + 'themeConfig.json');

        if(this.useFoundation) {
            this.copy('scss/_settings.scss', _baseFolder + 'scss/_settings.scss');
            this.template('scss/foundation.scss', _baseFolder + 'scss/foundation.scss');
        }

        if(this.options['theme-drupal-7']) {
            this.template('theme-drupal-7/_theme.info', _baseFolder + _themeFolder + '/' + _themeFolder + '.info');
            this.template('theme-drupal-7/_template.php', _baseFolder + _themeFolder + '/template.php');
        }
    }
});

module.exports = ModernThemeGenerator;

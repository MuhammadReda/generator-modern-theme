## Generator Prompts

When the generator runs, you should be alerted the following questions/messages:

- `Your project name`: The folder will contain all the generated files.
- `Your theme folder`: The name of the folder that will contain your theme files (HTML, Javascript, CSS and image files). Defaults to: `theme`
- `Bower Components folder`: The folder that [Bower](https://bower.io/) would use to download all its packages. Defaults to: `bower_components`
- `Would you like to use Modernizr?`: Would you like to download [Modernizr](http://modernizr.com/)? Defaults to: `Yes`
- `Would you like to use Foundation SASS Library?`: Would you like to download Foundation SASS library? Defaults to: `Yes`
- `Would you like to have your images minified?`: Would you like to install [grunt imagemin plugin](https://www.npmjs.org/package/grunt-contrib-imagemin) to have your images minified? Defaults to: `Yes`



### Default folder structure
With the default generator prompts, the generated folder structre should be like:

```shell
myProject
|
├── bower_components    # packages downloaded via bower.
|
├── node_modules        # packages downloaded via npm. 
|
├── scss                # default "scss" dir. (can be changed from "themeConfig.json")
|
├── theme               # Where all theme files reside
|
├── bower.json          
|
├── Gruntfile.js        # Grunt file.
|
├── package.json        
|
├── themeConfig.json    # Theme config file.
|
├── .bowerrc            # bower special config file.
|
└── .editorconfig       # Editor config. http://editorConfig.org/
```

---

[Improve this document.](https://github.com/MuhammadReda/generator-modern-theme/tree/docs/app/md-content/generator-prompts.md)

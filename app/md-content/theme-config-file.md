## Theme Config File <small>"themeConfig.json"</small>

This "modern-theme" generator is basically built to speed up the process of
creating HTML/CSS/JS themes that make use of popular grunt plugins
(that you maybe are using in every theme),
without the need to touch your `Gruntfile.js` file.

The generator is using a special config file `themeConfig.json` to do so.

`themeConfig.json` is a JSON object that represents 3 pain propertires:
- `sources`: Is where you set the source files you need to concat/minify.
- `destinations`: Is where you'll store the auto-generated files.
- `watch`: Is where you set tasks to be watch for changes.

An empty `themeConfig.json` should look like this:

```shell
{
    "sources": {
        "js": {},
        "css": {},
        "sass": {},
        "images": ""
    },
    "destinations": {
        "js": "",
        "css": "",
        "images": ""
    },
    "watch": {
        "js": [],
        "css": [],
        "sass": []
    }
}
```

---

#### themeConfig.json >> sources

`sources` property inside the theme configuration object consists of 4 properties (`js`, `css`, `sass` and `images`).
All of which is a JSON object (except `images` is a string) that consists of <u>key-value</u> pairs of JSON objects;
The <u>key</u> is a string for the output file name
and the <u>value</u> is an array of the files to be concatenated and/or minified.

###### Code sample:
```shell
{
    "sources": {
        "js": {
            "modernizr": [
                "bower_components/modernizr/modernizr.js"
            ],
            "vendor": [
                "bower_components/jquery/dist/jquery.min.js",
                "bower_components/fastclick/lib/fastclick.js",
                "bower_components/foundation/js/foundation/foundation.js"
            ],
            "custom": [
                "code/scripts/file-a.js",
                "code/scripts/file-b.js",
                "code/scripts/file-c.js"
            ]
        },
    ...
```

In the above code sample, the `js` object inside the `sources` object consists of 3 properties (`modernizr`, `vendor` and `custom`).
The generator will concatenate and minify all the javascript files isnide each array and will create 3 javascript files
named according to the <u>key</u> value
(Which means that we will have the files `modernizr.min.js`, `vendor.min.js` and `custom.min.js`).

---

#### themeConfig.json >> destinations
`destinations` property inside the main theme configuration object
is where you tell your theme to save the auto-generated files.

###### Code sample:
```shell
{
    ...
    "destinations": {
        "js": "assets/js",        # where generated .min.js file will be saved.
        "css": "assets/css",      # where generated .min.css file will be saved.
        "images": "assets/img"    # where minified images file will be saved.
    },
    ...
```

---

#### themeConfig.json >> watch
`watch` property inside the main theme configuration object
is where you mark the tasks to be watched for changes and run related grunt tasks.

###### Code sample:
```shell
{
    ...
    "watch": {
        "js": ["vendor", "custom"],
        "css": ["custom"],
        "sass": ["foundation"]
    }
}
```

In the above sample, the theme will watch for changes inside `sources.js.vendor` and `sources.js.custom` only
and will ignore all other objects inside `sources.js`.
And on every change on one of the files, the theme will re-concatenate and re-compress the files
and will generate a new minified & compressed version.

---

[Improve this document.](https://github.com/MuhammadReda/generator-modern-theme/tree/docs/app/md-content/theme-config-file.md)

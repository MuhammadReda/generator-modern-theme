## Built-in Grunt Tasks

So far, the generator only deals with (`.js`, `.css`, `.scss`, `.sass` and images)

---

#### task: `clean`
Cleans temporary files and build files. Runs 2 sub-tasks.
- `clean:temp`: Deletes all files inside the folder `/.~tmp`.
- `clean:build`: Deletes all auto-generated (`.js`, `.css` and images) files.

---

#### task: `compass`
Compiles (`.scss` and `.sass` files) and saves them to the CSS destination folder.

---

#### task: `concat`
Concatenates all grouped (`.js` and `.css` files) into one file and save
the generated file inside the project's temp folder.

---

#### task: `cssmin`
Minfies concatenated `css` files from the task `concat`,
and saves the minified version to the CSS destination folder.

---

#### task: `uglify`
Minfies concatenated `js` files from the task `concat`,
and saves the minified version to the JS destination folder.
<br/>
(`Mangle` feature is disabled by default.)

---

#### task: `imagemin` <small>(optional)</small>
Does as it says. Minifies all images inside the images source folder
and save them to the images destination folder.

---

#### task: `watch`
Watches for changesin (`js`, `css`, `sass`, `scss` files and `themeConfig.json` file)
and run related tasks accordingly.

---


[Improve this document.](https://github.com/MuhammadReda/generator-modern-theme/tree/docs/app/md-content/grunt-tasks.md)

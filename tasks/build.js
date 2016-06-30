const webserver = require('gulp-webserver');
const vfs = require("vinyl-fs");
const browserify = require("browserify");
const watchify = require("watchify");
const babelify = require('babelify');
const fs = require("fs");
const http = require('http');
const express = require('express');
const jsforceAjaxProxy = require('./proxy');

const bundler = browserify({
                    entries: ["src/index.js"],
                    debug: true,
                    extensions: ['.js', '.jsx', '.css'],
                })
                .transform("babelify", {
                    presets: ["es2015", "react"]
                })
                .plugin(watchify);

const rebundle = ()=>{
    bundler
        .bundle()
        .on("error", (e)=>{
            console.log(e);
        })
        .on("end", ()=>{
            console.log(`browserify compile success.`);
        })
        .pipe(fs.createWriteStream('dest/app.js'));
};

bundler.on("update", rebundle);
rebundle();

const app = express();

app.all('/proxy/?*', jsforceAjaxProxy({enableCORS: true}));

app.get('/', function(req, res) {
  res.send('JSforce AJAX Proxy');
});

http.createServer(app).listen(3000, function (e) {
    console.log("express server listening on port 3000")
});

vfs.src("./")
    .pipe(webserver({
        livereload: true,
        proxies:[{
            source: './',
            port:3000,
            target: 'https://login.salesforce.com/services/Soap/u/36.0',
            options: {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*'
                }
            }
        }]
    }));
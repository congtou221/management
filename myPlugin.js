const crypto = require('crypto');
const fs = require('fs');

function MyPlugin(options) {
  // Configure your plugin with options...
  this.file = options.filename;
  this.filepath = `${options.path}/${options.filename}`;
  this.hash = options.hash;
}

MyPlugin.prototype.apply = function(compiler) {
  let me = this;

  // ...
  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...');

    me.createScript().then(script => {

      compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {

        htmlPluginData.assets.js.unshift(script);

        callback(null, htmlPluginData);
      });

    }, err => {

    });

  });

};

MyPlugin.prototype.createMd5 = function(){
  let me = this;
  let hash = me.hash;
  let filepath = me.filepath;

  if(!hash){
    return;
  }

  let stream = fs.createReadStream(filepath);
  let fshash = crypto.createHash('md5');

  stream.on('data', function(d){
    fshash.update(d);
  });

  return new Promise((resolve, reject) => {
    stream.on('end', function(){
      let md5 = fshash.digest('hex');
      resolve(md5);
    });
  });
};

MyPlugin.prototype.createScript = function(){
  let me = this;
  let file = me.file;
  let script;

  return new Promise((resolve, reject) => {

    me.createMd5().then( md5 => {

      if(!!md5){
        script = `${file}?${md5}`;
      } else {
        script = `${file}`;
      }

      if(!!script){
        resolve(script);
      }

      reject(null);
    }, err => {

    });
  });

};

module.exports = MyPlugin;

var through = require('through2');
var path = require('path');
var EJT = require('./ejt');
var marked = require('marked');

module.exports = function (arg) {

  arg = arg || {};

  var options = arg || {};
  var data = arg.data || {};

  options.ext = options.ext || '.html';
  options.include = {
    '.md': marked
  };

  var ejt = new EJT(options);

  return through.obj(function(file, enc, callback) {
    try {
      ejt.render(replaceExtension(file.path, ""), data, function(err, html) {
        if (err) {
          throw err;
        }
        file.contents = new Buffer(html);
        file.path = replaceExtension(file.path, '.html');
      });
    } catch (e) {
      this.emit('error', e);
    }
    callback(null, file);
  });
};

function replaceExtension(npath, ext) {
  if (typeof npath !== 'string') return npath;
  if (npath.length === 0) return npath;

  var nFileName = path.basename(npath, path.extname(npath))+ext;
  return path.join(path.dirname(npath), nFileName);
};

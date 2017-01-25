'use strict';

const fs = require('fs');
const _ = require('lodash');
const pkgcloud = require('pkgcloud');

const config = require('../config/default');

function dest(outFolder, options) {
  const opt = _.merge(config, _.get(options, '', {}));
  const pkgopts = {
    name: opt.container,
  };

  // set up the pkgcloud storage client
  const storageClient = pkgcloud.storage.createClient(opt);

  // authorize the user
  storageClient.auth(err => {
    if (err) {
      console.error(err);
    }
    else {
      console.log(storageClient._identity);
    }
  });

  // check container exists
  storageClient.getContainer(pkgopts, (err, container) => {
    if (err) {
      console.error(err);
    }
    else {
      return through2.obj(function writeStream(file, encoding, callback) {
        const done = err => {
          callback(err, file);
        }

        const upload = storageClient.upload({
          container: container.name,
          remote: file.path,
        });

        upload.on('error', err => {
          console.error('error on upload');
          console.error(err);
          done(err);
        });

        upload.on('success', file => {
          console.error('success on upload');
          console.log(file.toJSON());
          done();
        });
      });
    }
  });
}

module.exports = dest;
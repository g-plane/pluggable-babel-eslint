const fs = require('fs')

function fileExists(path) {
  try {
    return fs.statSync(path).isFile()
  } catch (e) {
    return false
  }
}

exports.fileExists = fileExists

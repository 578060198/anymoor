const path = require('path')
// const conf = require('../config/default.config')

const mimeTypes = {
  'css': {
    text: 'text/css',
    icon: '/src/assets/img/css.png'
  },
  'html': {
    text: 'text/html',
    icon: '/src/assets/img/html.png'
  },
  'xml': {
    text: 'text/xml',
    icon: '/src/assets/img/file.png'
  },
  'txt': {
    text: 'text/plain',
    icon: '/src/assets/img/file.png'
  },
  'js': {
    text: 'text/javascript',
    icon: '/src/assets/img/javascript.png'
  },
  'json': {
    text: 'application/json',
    icon: '/src/assets/img/json.png'
  },
  'jpg': {
    text: 'image/jpeg',
    icon: '/src/assets/img/image.png'
  },
  'jpeg': {
    text: 'image/jpeg',
    icon: '/src/assets/img/image.png'
  },
  'png': {
    text: 'image/png',
    icon: '/src/assets/img/image.png'
  },
  'svg': {
    text: 'image/svg+xml',
    icon: '/src/assets/img/svg.png'
  },
  'gif': {
    text: 'image/gif',
    icon: '/src/assets/img/image.png'
  },
  'ico': {
    text: 'image/x-ico',
    icon: '/src/assets/img/image.png'
  },
  'dir': {
    text: 'text/plain',
    icon: '/src/assets/img/folder.png'
  },
  'git': {
    text: 'text/plain',
    icon: '/src/assets/img/git.png'
  },
  'gitignore': {
    text: 'text/plain',
    icon: '/src/assets/img/git.png'
  }
}

module.exports = (filePath) => {
  let ext = path.basename(filePath)
            .split('.')
            .pop()
            .toLowerCase()
  if (!ext) ext = filePath
  return mimeTypes[ext] || mimeTypes['txt']
}

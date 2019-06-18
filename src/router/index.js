const fs = require('fs')
const Handlebars = require('handlebars')
const path = require('path')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const mime = require('../helps/mime')
const compress = require('../helps/compress')
const range = require('../helps/range')
const isFresh = require('../helps/cache')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const sourse = fs.readFileSync(tplPath)
const template = Handlebars.compile(sourse.toString())

module.exports = async function (req, res, filePath, config) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      let contentType = mime(filePath).text
      res.setHeader('Content-Type', contentType)

      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end()
        return
      }

      let rs;
      const {start, end, code} = range(stats.size, req, res)
      if (code == 200) {
        res.statusCode = 200
        rs = fs.createReadStream(filePath)
      } else {
        res.statusCode = 206
        rs = fs.createReadStream(filePath, {start, end})
      }
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(config.root, filePath)
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file,
            icon: mime(file).icon || ''
          }
        })
      }
      res.end(template(data))
    }
  } catch(err) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a dirctory or file\n ${err.toString()}`)
  }
}

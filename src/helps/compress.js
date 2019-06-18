const {createGzip, createDeflate} = require('zlib')

module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding']
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
    return rs
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    res.setHeader('content-encoding', 'gzip')
    return rs.pipe(createGzip())
  } else if (acceptEncoding.match(/\bdeflate\b/)){
    res.setHeader('content-encoding', 'deflate')
    return rs.pipe(createDeflate())
  }
}

const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  entry: { index: path.resolve(__dirname, 'src', 'index.js') }
}

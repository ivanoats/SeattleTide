module.exports = {
  // entry: set by the sls plugin
  // output: set by the sls plugin
  target: 'node',
  externals: [
    /aws-sdk/ // available on AWS Lambda
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              '@babel/preset-env',
              {
                loose: true
              }
            ]
          ]
        }
      }
    ]
  }
}

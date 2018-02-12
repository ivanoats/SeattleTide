module.exports = {
  // entry: set by the sls plugin
  // output: set by the sls plugin
  target: "node",
  externals: [
    /aws-sdk/ // available on AWS Lambda
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [
            [
              "env",
              {
                target: { node: "6.10" },
                useBuiltIns: true,
                modules: false,
                loose: true
              }
            ],
            "stage-3"
          ]
        }
      }
    ]
  }
};

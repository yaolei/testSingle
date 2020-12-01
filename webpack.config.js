const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const StandaloneSingleSpaPlugin = require('standalone-single-spa-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const orgNameAs = "mt";

module.exports = (webpackConfigEnv, argv) => {
  let buildObj = [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src/index.html'),
      templateParameters: {
        isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
        orgName: orgNameAs
      },
    }),
  ];
  if (argv.mode) {
      // build file
    buildObj = [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, 'src/index.html'),
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
          orgName: orgNameAs
        },
      }),
    
      new StandaloneSingleSpaPlugin({
      // required
      appOrParcelName: "testSingle",
      importMap: {
        imports: {
          "testSingle": "./mt-testSingle.js",
          "react": "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js",
          "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js",
        }
      },
    })]
  }
  const defaultConfig = singleSpaDefaults({
    orgName: orgNameAs,
    projectName: "testSingle",
    webpackConfigEnv,
    argv,
  });
  const merge = webpackMerge({
    customizeArray: webpackMerge.unique(
      "mode",
      "entry",
      "module",
      "plugins",
      "output",
      "devServer",
      ["HtmlWebpackPlugin"],
      (plugin) => plugin.constructor && plugin.constructor.name
    ),
  });

  return merge(
    {
      mode: 'production',
      entry: path.resolve(__dirname, "src/index.js"),
      module:{
        rules:[
          // {parser: {System: false}},
          {
            test:`/\.(js|jsx)$/`,
            loader:'babel-loader',
            exclude:'/node_modules/'
          },
          {
            test: `/\.css$/`,
            use: [ 'style-loader', 'css-loader' ]
          }
        ]
      },
      output:{
        filename:'bundle.js',
        // library:'testSingle',
        libraryTarget: 'umd', 
        path:`${__dirname}/dist`
      },
      plugins: buildObj,
      devServer:{
        historyApiFallback: true
      }
    },
    defaultConfig,
    {
      // modify the webpack config however you'd like to by adding to this object
    }
  );
};
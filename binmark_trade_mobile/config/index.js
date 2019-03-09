"use strict";
const path = require("path");
module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      '/API': {
        target: "http://192.168.28.51:80",
        changeOrigin: true
      }
    },
    host: '192.168.28.250',
    port: 8080,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: "cheap-module-eval-source-map",
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    index: path.resolve(__dirname, "../mscoinmobile/index.html"),
    assetsRoot: path.resolve(__dirname, "../mscoinmobile"),
    assetsSubDirectory: "mbstatic",
    assetsPublicPath: "./",
    productionSourceMap: false,
    devtool: "#source-map",
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    bundleAnalyzerReport: process.env.npm_config_report
  }
};

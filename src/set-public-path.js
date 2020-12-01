// import { setPublicPath } from "systemjs-webpack-interop";
// /* This dynamically sets the webpack public path so that code splits work properly. See related:
//  * https://github.com/joeldenning/systemjs-webpack-interop#what-is-this
//  * https://webpack.js.org/guides/public-path/#on-the-fly
//  * https://single-spa.js.org/docs/faq/#code-splits
//  */

// setPublicPath("@mt/testSingle");


export default function setPublicPath() {
    return Promise.all([getUrl()]).then(values => {
      const [url] = values
      const webpackPublicPath = url.slice(0, url.lastIndexOf('/') + 1)
  
      __webpack_public_path__ = webpackPublicPath
      return true
    })
  }
  
  function getUrl () {
    return window.System.resolve('@mt/testSingle')
  }
  
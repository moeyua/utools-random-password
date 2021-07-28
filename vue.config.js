// utools打包时使用这个
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    // publicPath: process.env.NODE_ENV === 'production'
    // ? '/random-password/'
    // : '/'
    publicPath: './',
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new CopyPlugin(
                [
                    { from: 'utools' }
                ]
            ),
        ],
    }
} 

// git-pages打包使用这个
// module.exports = {
//     publicPath: process.env.NODE_ENV === 'production'
//     ? '/random-password/'
//     : '/'
// }
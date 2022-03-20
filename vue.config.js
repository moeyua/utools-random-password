const CopyPlugin = require("copy-webpack-plugin");
let plugins = process.env.VUE_APP_MODE === 'utools' ?
    [
        new CopyPlugin([
            { from: 'src/config/plugin.json'},
            { from: 'src/assets/logo.png', to: './assets/logo.png' }
        ])
    ] : [];
module.exports = {
    publicPath: process.env.VUE_APP_PATH,
    productionSourceMap: false,
    configureWebpack: {
        plugins: plugins,
    }
} 

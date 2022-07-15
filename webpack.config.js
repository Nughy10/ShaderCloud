const webpack = require('webpack')
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    mode:'development',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: '/js/',
        filename: 'three.bundle.js'
    },
    module: {
        rules: [ 
            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'glslify-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.NamedModulesPlugin(),
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3001,
                proxy: 'http://localhost:8080/',
                files: [
                    {
                        match: ['**/*.html'],
                        fn: event => {
                            if (event === 'change') {
                                const bs = require('browser-sync').get(
                                    'bs-webpack-plugin'
                                )
                                bs.reload()
                            }
                        }
                    }
                ]
            },
            {
                reload: false
            }
        )
    ],
    devServer: {
        hot: false, 
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/js/'
    },
    devtool: 'cheap-eval-source-map'
}

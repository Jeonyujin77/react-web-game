const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'gugudan-setting',
    mode: 'development', 
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./client']
    }, 
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                // 플러그인들의 모음: presets
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR'] //browserslist
                        },
                        debug: true
                    }],
                    '@babel/preset-react'
                ],
                plugins: []
            },
        }]
    },  
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ], // 확장 프로그램
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }, 

}
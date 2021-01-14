const path = require('path');

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
                presets: ['@babel/preset-env', '@babel/preset-react'],
                // plugins: ['@babel/plugin-proposal-class-properties'] // class type code일 경우 필요 
            }
        }]
    },
    
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }, 

}
const child_process = require('child_process');
const webpack       = require('webpack');


const http_process = child_process.spawn(
    'python',
    [ '-m', 'http.server', '80' ]
);


const webpack_config = {
    target: 'web',

    entry: {
        'assets/js/app': `${__dirname}/src/index.tsx`
    },

    output: {
        path: __dirname,
        filename: '[name].js'
    },

    resolve: {
        extensions: [ '.js', '.ts', '.tsx' ]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: 'ts-loader'
            }
        ]
    },

    optimization: {
        splitChunks: {
            name: 'assets/js/vendor',
            chunks: 'initial'
        }
    }
};

module.exports = webpack_config;
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
        // Код для onBeforeSetupMiddleware
        console.log('Before setup middleware');

        // Код для onAfterSetupMiddleware
        console.log('After setup middleware');

        return middlewares;
    },
    static: {
        directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    hot: true,
},
};
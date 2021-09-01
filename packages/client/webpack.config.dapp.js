const path = require('path')

const dotenv = require('dotenv')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * Obtain client id for OAuth link in React
 *
 * If in development mode or local production mode, search the .env file for
 * client id. If using Docker, pass a build arg.
 */
const getEnvFromDotEnvFile = dotenv.config()
let envKeys

if (getEnvFromDotEnvFile.error) {
  console.log('Getting environment variables from build args for production') // eslint-disable-line
  envKeys = {
    'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
    'process.env.DEMO': JSON.stringify(process.env.DEMO),
    'process.env.NODE_ENV': JSON.stringify('production'),
  }
} else {
  envKeys = {
    'process.env.CLIENT_ID': JSON.stringify(getEnvFromDotEnvFile.parsed['CLIENT_ID']),
    'process.env.DEMO': JSON.stringify(getEnvFromDotEnvFile.parsed['DEMO']),
  }
}

let common = {
  entry: ['/src/index.tsx'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[fullhash].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      /**
       * TypeScript (.ts/.tsx files)
       *
       * The TypeScript loader will compile all .ts/.tsx files to .js. Babel is
       * not necessary here since TypeScript is taking care of all transpiling.
       */
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      // Fonts
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
      },
      // Markdown
      {
        test: /\.md$/,
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
      },
    ],
  },
  resolve: {
    // Resolve in this order
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.md'],
    // Allow `@/` to map to `src/client/`
    alias: {
      '@': path.resolve(__dirname, '/src/client'),
      '@resources': path.resolve(__dirname, '/src/resources'),
      stream: 'stream-browserify',
      path: 'path-browserify',
    },
  },
  plugins: [
    // Get environment variables in React
    new webpack.DefinePlugin(envKeys),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
}

let dev = {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      // Styles
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/template.html',
      favicon: './public/favicon.ico',
    }),
  ],
}

module.exports = merge(common, dev)
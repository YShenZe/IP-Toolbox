import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpackNodeExternals from 'webpack-node-externals';

export default {
  target: 'web',  // 目标为浏览器
  entry: './src/app.js',  // 入口文件
  output: {
    filename: 'bundle.js',
    path: path.resolve('public/assets'),  // 输出到 public/assets 目录
  },
  externals: [webpackNodeExternals()],  // 排除 Node.js 自带的模块
  module: {
    rules: [
      {
        test: /\.css$/,   // 匹配所有 CSS 文件
        use: [
          MiniCssExtractPlugin.loader,  // 提取 CSS
          'css-loader',  // 解析 CSS 文件
          'postcss-loader',  // 处理 TailwindCSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles.css' }),  // 提取 CSS 文件
  ],
};

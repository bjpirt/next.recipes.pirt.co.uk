module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push(
      {
        test: /\.md$/,
        loader: 'raw-loader',
      }
    )
    return cfg;
  }
}
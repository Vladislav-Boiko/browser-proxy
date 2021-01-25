const path = require('path');

module.exports = async ({ config }) => {
  const fileLoaderRule = config.module.rules.find((rule) =>
    rule.test.test('.svg'),
  );
  fileLoaderRule.exclude = /\.svg$/;
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader'],
  });
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        atoms: path.resolve(__dirname, '../src/popup/components/atoms'),
        molecules: path.resolve(__dirname, '../src/popup/components/molecules'),
        organisms: path.resolve(__dirname, '../src/popup/components/organisms'),
        templates: path.resolve(__dirname, '../src/popup/components/templates'),
        store: path.resolve(__dirname, '../src/popup/redux'),
        utils: path.resolve(__dirname, '../src/popup/utils'),
        app: path.resolve(__dirname, '../src/popup'),
      },
    },
  };
};

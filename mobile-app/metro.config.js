// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const defaultSourceExts = require("metro-config/src/defaults/defaults").sourceExts;
const defaultAssetExts = require("metro-config/src/defaults/defaults").assetExts;

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
  ...config.resolver,
  assetExts: defaultAssetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...defaultSourceExts, "svg"],
  blockList: [/(.*.test.tsx?)$/],
};

config.resolver.blockList = [/(.*.test.tsx?)$/]

module.exports = config;

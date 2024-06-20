// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       // Required for expo-router
//       'react-native-reanimated/plugin',
//       'nativewind/babel',
//       ['module:react-native-dotenv', {
//         moduleName: '@env',
//         path: '.env',
//         blacklist: null,
//         whitelist: null,
//         safe: false,
//         allowUndefined: true,
//       }],
//     ],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      'nativewind/babel',
    ],
  };
};


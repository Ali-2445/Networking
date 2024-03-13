module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ["./src/theme/assets/fonts"],
    dependencies: {
      ...(process.env.NO_FLIPPER // or `process.env.NO_FLIPPER` for RN@0.71.x and above
        ? { 'react-native-flipper': { platforms: { ios: null } } }
        : {}),
    },
  };
  
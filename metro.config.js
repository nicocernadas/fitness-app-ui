const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg"],
};

module.exports = withNativewind(config, {
  // By default the CSS compiler replaces each var(--x) with its value at build time.
  // These change at runtime (ThemeProvider), so they must stay variables.
  // Keep in sync with themeColors in constants/theme.ts
  inlineVariables: {
    exclude: [
      "--color-background",
      "--color-font-primary",
      "--color-font-secondary",
      "--color-font-terciary",
      "--color-accent",
      "--color-border",
      "--color-tab-bar",
      "--color-button",
      "--color-button-text",
      "--color-input-border",
    ],
  },
});

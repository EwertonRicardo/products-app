const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "@components": __dirname + "/src/components",
  "@screens": __dirname + "/src/screens",
  "@services": __dirname + "/src/services",
  "@hooks": __dirname + "/src/hooks",
  "@navigation": __dirname + "/src/navigation",
  "@models": __dirname + "/src/models",
  "@api": __dirname + "/src/api"
};

module.exports = config;

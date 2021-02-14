const path = require("path");

module.exports = function (config, entry) {
  config.node = entry.isPluginCommand
    ? false
    : {
        setImmediate: false,
      };
  config.resolve.extensions.push(".ts", ".tsx");
  config.module.rules.push(
    {
      test: /\.(html)$/,
      use: [
        {
          loader: "@skpm/extract-loader",
        },
        {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "link:href"],
            interpolate: true,
          },
        },
      ],
    },
    {
      test: /\.(css)$/,
      use: [
        {
          loader: "@skpm/extract-loader",
        },
        {
          loader: "css-loader",
        },
      ],
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(process.cwd(), "tsconfig.json"),
          },
        },
      ],
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      ],
    }
  );
};

import BrowserWindow from "sketch-module-web-view";
import { getWebview } from "sketch-module-web-view/remote";
import UI from "sketch/ui";
import sketch from "sketch";

const document = sketch.getSelectedDocument();
const sharedTextStyles =
  document.sharedTextStyles.length > 0 && document.sharedTextStyles;

const sharedLayerStyles =
  document.sharedLayerStyles.length > 0 && document.sharedTextStyles;

let textStyles = {};
let layerStyles = {};

sharedTextStyles.forEach((textStyle) => {
  textStyles[textStyle.name] = (({
    fontSize,
    fontFamily,
    alignment,
    lineHeight,
    opacity,
    kerning,
  }) => {
    return {
      fontSize: fontSize + "px",
      fontFamily: fontFamily,
      textAlign: alignment,
      lineHeight: lineHeight ? lineHeight + "px" : "normal",
      opacity: opacity,
      letterSpacing: kerning ? kerning + "px" : "normal",
    };
  })(textStyle.style);
});

// Webview stuff

const webviewIdentifier = "chakrathememaker.webview";

export default function () {
  const options = {
    identifier: webviewIdentifier,
    width: 800,
    height: 600,
    show: false,
  };

  const browserWindow = new BrowserWindow(options);

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once("ready-to-show", () => {
    browserWindow.show();
  });

  const webContents = browserWindow.webContents;

  // hand textStyles over to webview
  webContents.on("nativeLog", (s) => {
    UI.message(s);
    webContents
      .executeJavaScript(`sendData(${JSON.stringify(textStyles)})`)
      .catch(console.error);
  });
  browserWindow.loadURL(require("../resources/webview.html"));
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier);
  if (existingWebview) {
    existingWebview.close();
  }
}

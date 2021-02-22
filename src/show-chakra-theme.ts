import sketch, { SharedStyle } from "sketch";
import BrowserWindow from "sketch-module-web-view";
import { getWebview } from "sketch-module-web-view/remote";
import UI from "sketch/ui";

type TODO = any;

function createTextStyles(): TODO {
  const document = sketch.getSelectedDocument();
  const sharedTextStyles: SharedStyle[] = document.sharedTextStyles.length
    ? document.sharedTextStyles
    : [];

  const textStyles: Record<string, TODO> = {};

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

  return textStyles;
}

function createLayerStyles(): TODO {
  const document = sketch.getSelectedDocument();
  const sharedLayerStyles: SharedStyle[] = document.sharedLayerStyles.length
    ? document.sharedLayerStyles
    : [];

  const layerStyles: Record<string, TODO> = {};

  // todo: Add gradient support and support for innerShadows and more than one shadow

  sharedLayerStyles.forEach((layerStyle) => {
    layerStyles[layerStyle.name] = (({
      opacity,
      borders,
      borderOptions,
      blur,
      fills,
      shadows,
    }) => {
      return {
        opacity: opacity,
        borderColor: borders.length > 0 ? borders[0].color : "none",
        borderStyle: borderOptions.dashPattern.length > 0 ? "solid" : "dashed",
        borderWidth: borders.length > 0 ? `${borders[0].thickness}px` : "none",
        filter: blur ? `blur(${blur.radius}px)` : "none",
        backgroundColor: fills.length > 0 ? fills[0].color : "none",
        boxShadow:
          shadows.length > 0
            ? `${shadows[0].x}px ${shadows[0].x}px ${shadows[0].blur}px ${shadows[0].spread}px ${shadows[0].color}`
            : "none",
      };
    })(layerStyle.style);
  });

  return layerStyles;
}

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

  console.log(createLayerStyles());

  // hand textStyles over to webview
  webContents.on("nativeLog", (s) => {
    UI.message("neu");
    webContents
      .executeJavaScript(`sendData(${JSON.stringify(createLayerStyles())})`)
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

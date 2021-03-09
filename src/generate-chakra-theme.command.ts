import BrowserWindow from "sketch-module-web-view";
import { getWebview } from "sketch-module-web-view/remote";
import { HandlerName, handlers } from "./handlers";

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
  webContents.on("webview-com", (eventName: HandlerName) => {
    const handler = handlers[eventName];
    const data = handler?.() ?? null;
    const serializedData = JSON.stringify(data);
    const code = `sendData('${eventName}', '${serializedData}')`;

    webContents.executeJavaScript(code).catch(console.error);
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

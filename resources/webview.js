import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.tsx";

// call the plugin from the webview
document.getElementById("button").addEventListener("click", () => {
  window.postMessage("nativeLog", "Called from the webview");
});

window.sendData = (data) => {
  // create and dispatch the event including the data
  let event = new CustomEvent("send-data", {
    detail: { data },
  });
  window.dispatchEvent(event);
};

(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
})();

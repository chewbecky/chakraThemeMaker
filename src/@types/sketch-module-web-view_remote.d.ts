declare module "sketch-module-web-view/remote" {
    import BrowserWindow from "sketch-module-web-view";

    export function getWebview(id: string): BrowserWindow
    export function isWebviewPresent(id: string): boolean
    export function sendToWebview(id: string, evalString: string): void
}

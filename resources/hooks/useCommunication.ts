import { useMutation } from "react-query";

/**
 * @example
 * const { mutate, data } = useCommunication("your-event-name");
 *
 * // 1. send event to the backend
 * <Button onClick={() => mutate()}>Communicate</Button>
 *
 * // 2. receive the answer in `data`
 * console.log(data)
 */
export function useCommunication<Data = unknown>(eventName: string) {
  return useMutation<Data, Error, Transferable[] | void>(
    eventName,
    async (data) =>
      new Promise((resolve, reject) => {
        try {
          const extractData = (event: CustomEvent<{ data: Data }>) =>
            resolve(event.detail.data);

          window.addEventListener(
            createCallbackEventName(eventName),
            extractData,
            {
              once: true,
            }
          );

          window.postMessage("webview-com", eventName, data as Transferable[]);
        } catch (e) {
          reject(e);
        }
      })
  );
}

/**
 * This function will be called by the backend to send data to the frontend application
 *
 * @param eventName
 * @param serializedData
 */
(window as any).sendData = (eventName: string, serializedData: string) => {
  const data = JSON.parse(serializedData);

  // create and dispatch the event including the data
  const event = new CustomEvent(createCallbackEventName(eventName), {
    detail: { data },
  });

  console.log("sendData", eventName, data);

  window.dispatchEvent(event);
};

function createCallbackEventName(eventName: string) {
  return `callback-${eventName}`;
}

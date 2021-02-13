import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState("Hier erscheint gleich das Theme Object");

  useEffect(() => {
    function handleDataEvent(event: any) {
      setData(JSON.stringify(event.detail.data));
    }
    window.addEventListener("send-data", handleDataEvent);
    return function cleanup() {
      window.removeEventListener("send-data", handleDataEvent);
    };
  });

  return (
    <div>
      <textarea readOnly value={data}></textarea>
    </div>
  );
};

export default App;

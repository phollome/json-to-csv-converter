import React, { useRef, useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const inputRef = useRef(null);
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    if (inputRef && inputRef.current) {
      try {
        const json = JSON.parse(inputRef.current.value.trimStart().trimEnd());

        const columns = Object.keys(json[0]);
        const header = `${columns.join(",")}`;
        const rows = json.map((item) => {
          const values = columns.map((key) => item[key] || "");
          return values.join(",");
        });
        const converted = [header].concat(rows).join("\r\n");

        if (navigator.clipboard) {
          await navigator.clipboard.writeText(converted);
          setMessage("copied to clipboard! 👍");
        } else {
          setMessage("couldn't copy to clipboard! 🙈");
        }
      } catch (err) {
        setMessage(`❗ ${err.message}`);
      }
    }
  };

  useEffect(() => {
    if (message === "") {
      return;
    }
    const timeout = setTimeout(() => {
      setMessage("");
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  return (
    <div className="App">
      <h1>JSON to CSV Converter</h1>
      <div>
        <textarea
          ref={inputRef}
          cols="50"
          rows="10"
          defaultValue={JSON.stringify([{ text: "Hallo" }, { text: "World!" }])}
        ></textarea>
      </div>
      <div>
        <button type="button" onClick={handleClick}>
          {"Convert and copy to clipboard"}
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
}

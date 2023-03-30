import React, { useState } from "react";
import dynamic from "next/dynamic"; // import dynamic from Next.js

import Navbar from "@/components/navbar";

const Editor = dynamic(import("@monaco-editor/react"), { ssr: false }); // dinamis impor Monaco Editor

const Compiler = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [postBody, setPostBody] = React.useState("");
  const [output, setOutput] = useState(""); // state untuk output

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedLanguage); // log the selected language to console
    // code for compiling goes here

    // contoh output
    setOutput("Output code here");
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <h1 className="text-3xl font-bold mt-6 text-center font-mono">
        Online Compiler
      </h1>
      <div className="flex-1 pl-24 pr-24">
        {/* form untuk input kode */}
        <div className="flex flex-col gap-2">
          <label htmlFor="language" className="font-semibold">
            Select a Programming Language:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="p-2 border rounded-md"
          >
            <option value="">Select a language</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
          </select>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="input-code" className="font-semibold">
            Input Your Code:
          </label>
          {/* Use dynamic component */}
          <Editor
            editorDidMount={() => {
              // @ts-ignore
              window.MonacoEnvironment.getWorkerUrl = (
                _moduleId: string,
                label: string
              ) => {
                if (label === "json")
                  return "_next/static/json.worker.js";
                if (label === "css")
                  return "_next/static/css.worker.js";
                if (label === "html")
                  return "_next/static/html.worker.js";
                if (
                  label === "typescript" ||
                  label === "javascript"
                )
                  return "_next/static/ts.worker.js";
                return "_next/static/editor.worker.js";
              };
            }}
            width="800"
            height="50vh"
            language="javascript"
            theme="vs-dark"
            value={postBody}
            options={{
              minimap: {
                enabled: false
              }
            }}
            onChange={setPostBody}
          />

          <button
            type="submit"
            disabled={!selectedLanguage}
            className={`bg-blue-500 text-white py-2 rounded-md mt-4 ${
              !selectedLanguage && "opacity-50 cursor-not-allowed"
            }`}
          >
            Compile
          </button>
        </form>
        <div className="flex flex-col gap-2">
          <label htmlFor="output" className="font-semibold">
            Output:
          </label>
          {/* tambahkan div output */}
          <div className="p-2 border rounded-md">{output}</div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
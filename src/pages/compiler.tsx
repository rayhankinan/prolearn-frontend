import React, { useState, useEffect, useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import Navbar from "@/components/navbar";
import CodeSubmit from "@/interfaces/code-submit-interface";
import jobsService from "@/services/jobs-service";

const languages: {
  [key: string]: string;
} = {
  javascript: 'js',
  cpp: 'cpp',
  c: 'c',
  python: 'py',
};

const Compiler = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [output, setOutput] = useState("");
  const [jobId, setJobId] = useState<number>(0);
  const [status, setStatus] = useState<string | null>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  let pollInterval: number;

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) {
    editorRef.current = editor;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const extension = languages[selectedLanguage];
    
    let payload: CodeSubmit;

    payload = {
      extension: extension,
      code: editorRef.current?.getValue() as string,
    }

    try {
      setOutput("Compiling...");
      setStatus(null);
      jobsService.runJobs(payload).then((response) => {
        setJobId(response.data.id);
        setStatus(response.data.status);
        pollInterval = window.setInterval(async () => {
          jobsService.getStatus(response.data.id).then((response) => {
            console.log(response.data);
            setStatus(response.data.status);
            if (status !== "PENDING") {
              clearInterval(pollInterval);
              setOutput(response.data.output);
            }
          });
        }, 1000);
      });
    } catch (error) {
      console.log(error);
      setOutput("Error");
    }
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
            <option value="cpp">C++</option>
          </select>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="input-code" className="font-semibold">
            Input Your Code:
          </label>
          <Editor
            height="50vh"
            language={selectedLanguage}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              automaticLayout: true,
              fontSize: 16,
            }}
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
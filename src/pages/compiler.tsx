import React, {
  useState,
  useRef,
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import Navbar from "@/components/navbar";
import CodeSubmit from "@/interfaces/code-submit-interface";
import jobsService from "@/services/jobs-service";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";

const languages: {
  [key: string]: string;
} = {
  javascript: "js",
  cpp: "cpp",
  c: "c",
  python: "py",
};

const Compiler = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [output, setOutput] = useState("");
  const [jobId, setJobId] = useState<number>(0);
  const [status, setStatus] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const { isLoggedIn } = React.useContext(AuthContext);

  let pollInterval: number;

  const handleLanguageChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setInput(event.target.value);
  };

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const extension = languages[selectedLanguage];

    let payload: CodeSubmit;

    if (input !== "") {
      payload = {
        extension: extension,
        code: editorRef.current?.getValue() as string,
        input: input,
      };
    } else {
      payload = {
        extension: extension,
        code: editorRef.current?.getValue() as string,
      };
    }

    try {
      setOutput("Compiling...");
      setStatus(null);
      jobsService.runJobs(payload).then((response) => {
        setJobId(response.data.id);
        setStatus(response.data.status);
        pollInterval = window.setInterval(async () => {
          jobsService.getStatus(response.data.id).then((response) => {
            setStatus(response.data.status);
            if (status !== "PENDING") {
              clearInterval(pollInterval);
              setOutput(response.data.output);
            }
          });
        }, 1000);
      });
    } catch (error) {
      setOutput("Error");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      <Head>
        <title>Online Compiler</title>
      </Head>
      <h1 className="text-3xl font-bold mt-6 text-center font-mono mb-6">
        Online Compiler
      </h1>
      <div className="flex flex-row">
        <div className="flex w-3/5">
          <div className="flex-1 pl-24 pr-24">
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
                <option value="c">C</option>
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
          </div>
        </div>
        <div className="flex flex-col w-2/5 mr-10 mt-6 align-middle">
          <div className="flex flex-col gap-2 h-1/2">
            <label htmlFor="input" className="font-semibold pl-2">
              Input:
            </label>
            <div className="p-2 h-4/5">
              <textarea
                className="w-full h-full border-4 border-gray-400 rounded-md placeholder:text-gray-500 pl-[14px] pt-[14px]"
                style={{ resize: "none" }}
                placeholder="Enter your input here"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 h-1/2 p-2">
            <label htmlFor="output" className="font-semibold">
              Output:
            </label>
            <div className="p-2 border border-4 border-gray-400 rounded-md h-4/5">
              {output}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;

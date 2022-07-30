import React from "react";
import { useState } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import Editor from "react-simple-code-editor";
import Select from "react-select";

const languages = [
  { value: "markup", label: "markup" },
  { value: "bash", label: "bash" },
  { value: "clike", label: "clike" },
  { value: "c", label: "c" },
  { value: "cpp", label: "cpp" },
  { value: "css", label: "css" },
  { value: "javascript", label: "javascript" },
  { value: "jsx", label: "jsx" },
  { value: "coffeescript", label: "coffeescript" },
  { value: "actionscript", label: "actionscript" },
  { value: "css-extr", label: "css-extr" },
  { value: "diff", label: "diff" },
  { value: "git", label: "git" },
  { value: "go", label: "go" },
  { value: "graphql", label: "graphql" },
  { value: "handlebars", label: "handlebars" },
  { value: "json", label: "json" },
  { value: "less", label: "less" },
  { value: "makefile", label: "makefile" },
  { value: "markdown", label: "markdown" },
  { value: "objectivec", label: "objectivec" },
  { value: "ocaml", label: "ocaml" },
  { value: "python", label: "python" },
  { value: "reason", label: "reason" },
  { value: "sass", label: "sass" },
  { value: "scss", label: "scss" },
  { value: "sql", label: "sql" },
  { value: "stylus", label: "stylus" },
  { value: "tsx", label: "tsx" },
  { value: "typescript", label: "typescript" },
  { value: "wasm", label: "wasm" },
  { value: "yaml", label: "yaml" },
];

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: "white",
    backgroundColor: "#1e293b",
  }),
  control: (provided) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    backgroundColor: "#1e293b",
    color: "white",
  }),
  input: (provided) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    color: "white",
  }),
  singleValue: (provided) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    color: "white",
  }),
  valueContainer: (provided) => ({
    ...provided,
    color: "white",
  }),
};

const CodeInput = () => {
  const [code, setCode] = useState(`console.log("Hello World")`);
  const [selected, setSelected] = useState(languages[6]);

  const highlightCustom = (code) => (
    <Highlight  {...defaultProps} code={code} language={selected.value}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <span className="editorLineNumber">{i + 1}</span>
              {line.map((token, key) => (
                // <div className="">
                    <span {...getTokenProps({ token, key })} />
                // </div>
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );

  return (
    <div className="mx-8 my-20 flex flex-col gap-2 lg:mx-12 xl:mx-32">
      <Select
        styles={customStyles}
        options={languages}
        placeholder="Select Language..."
        value={selected}
        onChange={(e) => setSelected(e)}
      />
      <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Title - Required"
        className="w-full outline-none py-2 px-4 bg-slate-800 border-[1px] border-gray-600 rounded text-sm"
      />
          <input
        type="text"
        placeholder="Result - Optional"
        className="w-full py-2 px-4 outline-none bg-slate-800 border-[1px] border-gray-600 rounded text-sm"
      />
      </div>
      <div className="">
        <Editor
          className="bg-slate-900 editor outline-none  text-white border-[1px] rounded border-white"
          value={code}
          textareaId="codeArea"
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlightCustom(code)}
          padding={12}
          placeholder="Start write your code here"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            // minHeight: 80,
          }}
        />
      </div>
    </div>
  );
};

export default CodeInput;

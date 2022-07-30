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
    color: "white"
  }),
  input: (provided) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    color: "white"
  }),
  singleValue: (provided) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    color: "white"
  }),
  valueContainer: (provided) => ({
    ...provided,
    color: "white"
  })
};

const CodeInput = () => {
  const [code, setCode] = useState(`console.log("Hello World")`);

  const highlightCustom = (code) => (
    <Highlight {...defaultProps} code={code} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <span className="editorLineNumber">{i + 1}</span>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );

  return (
    <div className="mx-8 my-16 lg:mx-12 xl:mx-32">
      <Select
        styles={customStyles}
        options={languages}
        placeholder="Select Language..."
      />
      <div className="my-2">
        <Editor
          className="bg-slate-800 editor text-white border-[1px] rounded border-gray-600"
          value={code}
          textareaId="codeArea"
          onValueChange={(code) => setCode(code)}
          // highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
          highlight={(code) => highlightCustom(code)}
          padding={12}
          placeholder="Start write your code here"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </div>
    </div>
  );
};

export default CodeInput;

import React from "react";
import { useState } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import Editor from "react-simple-code-editor";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { auth, firestoreDb, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const languages = [
  { value: "markup", label: "markup" },
  { value: "bash", label: "bash" },
  { value: "clike", label: "clike" },
  { value: "c", label: "c" },
  { value: "cpp", label: "c++" },
  { value: "css", label: "css" },
  { value: "javascript", label: "javascript" },
  { value: "javascript", label: "java" },
  { value: "jsx", label: "jsx" },
  { value: "coffeescript", label: "coffeescript" },
  { value: "actionscript", label: "actionscript" },
  { value: "css-extr", label: "css-extr" },
  { value: "diff", label: "diff" },
  { value: "git", label: "git" },
  { value: "go", label: "golang" },
  { value: "graphql", label: "graphql" },
  { value: "handlebars", label: "handlebars" },
  { value: "json", label: "json" },
  { value: "less", label: "less" },
  { value: "makefile", label: "makefile" },
  { value: "markdown", label: "markdown" },
  { value: "objectivec", label: "objectivec" },
  { value: "ocaml", label: "ocaml" },
  { value: "python", label: "python" },
  { value: "jsx", label: "php" },
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
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [code, setCode] =
    useState(``);
  const [selected, setSelected] = useState(languages[6]);
  const user = auth.currentUser;

  const highlightCustom = (code) => (
    <Highlight {...defaultProps} code={code} language={selected.value}>
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

  const submitHandler = async (data) => {
    try {
      if (!user) {
        await signInWithPopup(auth, googleProvider);
      }
      await addDoc(collection(firestoreDb, "snippets"), {
        userId: user.uid,
        userProfile: user.photoURL,
        userName: user.displayName ,
        title: data.title,
        titleLower: data.title.toLowerCase(),
        result: data.result,
        code: code,
        language: selected.label,
        syntax: selected.value,
        like: 0,
        createdAt: serverTimestamp()
      })
      navigate('me')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="mx-8 mt-20 mb-2 max-w-7xl lg:mx-auto flex flex-col gap-2 xl:mx-32 2xl:mx-auto"
    >
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
          //   required
          {...register("title", { required: true })}
          placeholder="Title - Required"
          className={`w-full outline-none py-2 px-4 bg-slate-800 border-[1px] border-gray-600 rounded text-sm ${
            errors.title && "border-red-600"
          } `}
        />
        <input
          type="text"
          placeholder="Result - Optional"
          {...register("result")}
          className="w-full py-2 px-4 outline-none bg-slate-800 border-[1px] border-gray-600 rounded text-sm"
        />
      </div>
      <div className="">
        <Editor
          required
          className="bg-slate-900 overflow-scroll editor outline-none  text-white border-[1px] rounded border-white"
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
      <div className="flex mt-1 justify-end">
        <button
          type="submit"
          className="bg-indigo-600 font-medium py-2 px-6 rounded hover:bg-indigo-700"
        >
          Create & Share
        </button>
      </div>
    </form>
  );
};

export default CodeInput;

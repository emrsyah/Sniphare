import Highlight, { defaultProps } from "prism-react-renderer";
import React from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import dateConverter from "../helpers/dateConverter";
import { doc, increment, updateDoc } from "firebase/firestore";
import { firestoreDb } from "../firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import DeleteModal from "./DeleteModal";
import { deleteAtomState } from "../atoms/deleteAtom";
import { useSetRecoilState } from "recoil";
dayjs.extend(relativeTime);

const SnippetDetail = ({
  code,
  language,
  id,
  title,
  createdAt,
  userProfile,
  userName,
  userId,
  like,
  result,
  syntax,
}) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const setDelete = useSetRecoilState(deleteAtomState);

  const highlightCustom = (code, lang) => (
    <Highlight {...defaultProps} code={code} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <span className="editorLineNumber ml-1 mr-4">{i + 1}</span>
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

  const copyHandler = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copy Code To Clipboard🗒️", { autoClose: 1500 });
  };

  const copyHandlerLink = () => {
    navigator.clipboard.writeText(`https://sniphare.vercel.app/snippet/${id}`);
    toast.success("Copy Link To Clipboard🗒️", { autoClose: 1500 });
  };

  const addLikeHandler = async () => {
    await updateDoc(doc(firestoreDb, "snippets", id), {
      like: increment(1),
    });
  };

  const deleteHandler = () => {
    if (user.userId === userId) {
      setDelete(true);
    }
  };

  return (
    <>
      <DeleteModal id={id} />
      <div className="col-span-1 flex flex-col bg-slate-900  p-3 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={userProfile}
              className="w-14 h-14 rounded-full border-2 border-indigo-500"
              alt="profile"
            />
            <div className="flex flex-col">
              <h5 className="font-medium text-lg">{userName}</h5>
              <p className=" text-gray-400">{dateConverter(createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              onClick={() => addLikeHandler()}
              className="p-2 border-[1px] hover:bg-slate-800 hover:text-indigo-500 border-gray-700 rounded flex items-center gap-2 cursor-pointer"
            >
              {like > 0 ? (
                <Icon
                  icon="ant-design:heart-filled"
                  className="text-indigo-500"
                  width={20}
                />
              ) : (
                <Icon icon="ant-design:heart" width={22} />
              )}
              <p>{like}</p>
            </div>
            {/* <div className="p-2 border-[1px] border-gray-700 rounded flex items-center gap-2 cursor-pointer">
            <Icon icon="bi:bookmark" width={18} />
          </div> */}
            <div
              onClick={() => copyHandlerLink()}
              className="p-2 border-[1px] border-gray-700 hover:bg-slate-800 hover:text-indigo-500 rounded flex items-center gap-2 cursor-pointer"
            >
              <Icon icon="bxs:share-alt" width={22} />
            </div>
            <div
              onClick={() => copyHandler()}
              className="p-2 border-[1px] border-gray-700 hover:bg-slate-800 hover:text-indigo-500 rounded flex items-center gap-2 cursor-pointer"
            >
              <Icon icon="fluent:clipboard-16-regular" width={24} />
            </div>
            {userId === user.userId && (
              <div
                onClick={() => deleteHandler()}
                className="p-2 border-[1px] border-gray-700 hover:bg-slate-800 hover:text-red-500 rounded flex items-center gap-2 cursor-pointer"
              >
                <Icon icon="icons8:trash" width={24} />
              </div>
            )}
          </div>
        </div>
        <h5 className="mt-4 mb-2 text-3xl font-medium">{title}</h5>
        <div className="my-2 bg-slate-800 p-1 rounded relative scroll overflow-y-auto overflow-x-hidden">
          <div>{highlightCustom(code, syntax)}</div>
          <div
            onClick={() => navigate(`/tag/${language}`)}
            className="absolute right-1 cursor-pointer bg-indigo-600 py-1 px-2 rounded top-1 font-medium text-sm"
          >
            {language}
          </div>
        </div>
        {result && (
          <div className="p-2 bg-slate-800 rounded text-sm text-gray-300">
            {result}
          </div>
        )}
      </div>
    </>
  );
};

export default SnippetDetail;

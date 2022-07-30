import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { firestoreDb } from "../firebase";
import SnippetPost from "../components/SnippetPost";
import { useNavigate } from "react-router-dom";

const lang = [
  "Javascript",
  "Python",
  "CSS",
  "Java",
  "PHP",
  "Typescript",
  "Graphql",
  "Golang",
  "CPP",
  "SQL",
  "Git",
  "Bash",
];

const Explore = () => {
  const [snippets, setSnippets] = useState();
  const navigate = useNavigate()

  const getData = () => {
    const q = query(collection(firestoreDb, "snippets"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   console.log(querySnapshot.docs);
      setSnippets(querySnapshot.docs);
    });
    return unsubscribe;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Explore Snippets</title>
      </Helmet>
      <div>
        <Navbar />
        <div className="max-w-7xl 2xl:mx-auto mx-14 my-12">
          <h1 className="text-4xl font-semibold">Find The Snippet You Need</h1>

          {/* Search Bar */}
          <div className="flex items-center gap-1 bg-slate-800 px-4 rounded-sm border-[1px] border-gray-600 my-4">
            <Icon icon="eva:search-fill" width={20} />
            <input
              type="text"
              className="outline-none bg-transparent p-2 w-full"
              placeholder="How to center a div in CSS"
            />
          </div>

          {/* Tag */}
          <div className="flex scroll items-center gap-3 overflow-auto pb-2">
            {lang.map((l) => (
              <div 
              onClick={()=>navigate(`/tag/${l}`)}
              className="py-[5px] px-5 cursor-pointer rounded-full bg-slate-800 hover:bg-slate-900 border-[1px] border-gray-600">
                {l}
              </div>
            ))}
          </div>

          <div className="w-full my-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {snippets && (
              <>
                {snippets.map((snippet) => (
                  <SnippetPost key={snippet?.id} {...snippet?.data()} id={snippet?.id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;

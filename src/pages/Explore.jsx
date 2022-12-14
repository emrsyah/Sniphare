import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { firestoreDb } from "../firebase";
import SnippetPost from "../components/SnippetPost";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const lang = [
  "Javascript",
  "Python",
  "CSS",
  "Java",
  "PHP",
  "Typescript",
  "Graphql",
  "Golang",
  "C++",
  "SQL",
  "Git",
  "Bash",
];

const Explore = () => {
  const [snippets, setSnippets] = useState();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  const getData = () => {
    const q = query(
      collection(firestoreDb, "snippets"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if(querySnapshot.docs.length > 0){
        setSnippets(querySnapshot.docs);
        setStatus('finished')
      }
      else{
        setSnippets([])
        setStatus('no data')
      }
    });
    return unsubscribe;
  };

  useEffect(() => {
    try{
      getData();
    }catch(err){
      console.error(err);
    }
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
          <SearchBar />

          {/* Tag */}
          <div className="flex scroll items-center gap-3 overflow-auto pb-2">
            {lang.map((l) => (
              <div
                onClick={() => navigate(`/tag/${l}`)}
                key={l}
                className="py-[5px] px-5 cursor-pointer rounded-full bg-slate-800 hover:bg-slate-900 border-[1px] border-gray-600"
              >
                {l}
              </div>
            ))}
          </div>

          {status === "loading" ? (
            <div className="text-3xl font-medium my-4 text-gray-300">
              Getting Data...
            </div>
          ) : (
            <>
              {status === "no data" ? (
                <div className="text-3xl font-medium my-4 text-gray-300">
                  No Snippet Yet, Share One
                </div>
              ) : (
                <div className="w-full my-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {snippets && (
                    <>
                      {snippets.map((snippet) => (
                        <SnippetPost
                          key={snippet?.id}
                          {...snippet?.data()}
                          id={snippet?.id}
                        />
                      ))}
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Explore;

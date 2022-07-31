import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { firestoreDb } from "../firebase";
import { Icon } from "@iconify/react";
import SnippetPost from "../components/SnippetPost";

const Tag = () => {
  const { id } = useParams();
  const [snippets, setSnippets] = useState();
  const [status, setStatus] = useState("loading");

  const getSnippets = async () => {
    const ref = collection(firestoreDb, "snippets");

    const q = query(
      ref,
      where("language", "==", id.toLowerCase()),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length) {
      setSnippets(querySnapshot.docs);
      setStatus("finished");
    } else {
      setSnippets([]);
      setStatus("no data");
    }
  };

  useEffect(() => {
    try {
      getSnippets();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Tag {id} | Sniphare</title>
      </Helmet>
      <div>
        <Navbar />
        <div className="max-w-7xl 2xl:mx-auto mx-14 my-12">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-800 rounded-lg">
              <Icon icon="fluent:tag-24-regular" width={32} />
            </div>
            <h1 className="text-4xl font-semibold tracking-wide ">{id} <span>{`(${snippets ? snippets.length : ""})`}</span></h1>
          </div>

          {status === "loading" ? (
            <div className="text-2xl text-gray-300 font-semibold mt-8">Loading...</div>
          ) : (
            <>
              {status === "no data" ? (
                <div className="text-2xl text-gray-300 font-semibold mt-8">No Snippet For This Tag</div>
              ) : (
                <div className="w-full my-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {snippets.map((snippet) => (
                    <SnippetPost
                      key={snippet?.id}
                      {...snippet?.data()}
                      id={snippet?.id}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Tag;

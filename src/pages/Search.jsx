import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SnippetPost from "../components/SnippetPost";
import { firestoreDb } from "../firebase";

const Search = () => {
  const [queryParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [snippets, setSnippets] = useState();

  const getData = async () => {
    const ref = collection(firestoreDb, "snippets");

    const q = query(
      ref,
      orderBy("titleLower"),
      startAt(queryParams.get("q").toLowerCase()),
      endAt(queryParams.get("q").toLowerCase() + "\uf8ff")
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
      getData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Search {queryParams.get("q") ? queryParams.get("q") : ""} | Sniphare
        </title>
      </Helmet>
      <div>
        <Navbar />
        <div className="max-w-7xl 2xl:mx-auto mx-14 my-12">
          <h1 className="text-3xl font-semibold">
            Search for {queryParams.get("q") ? queryParams.get("q") : ""} <span>{snippets && `(${snippets.length})`}</span>
          </h1>

          {status === "loading" ? (
            <div className="text-2xl text-gray-300 font-semibold mt-8">
              Loading...
            </div>
          ) : (
            <>
              {status === "no data" ? (
                <div className="text-2xl text-gray-300 font-semibold mt-8">
                  Sorry Snippet Is Not Found
                </div>
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

export default Search;

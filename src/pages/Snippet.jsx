import { doc, getDoc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SnippetDetail from "../components/SnippetDetail";
import { firestoreDb } from "../firebase";

function Snippet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [snippet, setSnippet] = useState();


  const getSnippet = () => {
    const unsubscribe = onSnapshot(doc(firestoreDb, "snippets", id), (doc) => {
      if (!doc.exists()) {
        navigate("/explore");
        return;
      }
      setSnippet(doc);
      // console.log(docSnap.data());
      setStatus("finished");
    });
    return unsubscribe;
  };

  useEffect(() => {
    try {
      getSnippet();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <Helmet>Snippet Detail | Sniphare</Helmet>
      <div>
        <Navbar />
        <div className="max-w-7xl 2xl:mx-auto mx-14 my-10">
          {status === "loading" ? (
            <div className="text-2xl font-medium">Getting Data...</div>
          ) : (
            <SnippetDetail {...snippet?.data()} id={snippet?.id} />
            // <div></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Snippet;

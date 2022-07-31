import { doc, getDoc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { userState } from "../atoms/userAtom";
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
        navigate("/snippet", { replace: true });
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
      console.log(user)
    } catch (err) {
      console.error(err);
    }
  }, []);

  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       setUser({
  //         userId: user.uid,
  //         userProfile: user.photoURL,
  //         userName: user.displayName,
  //       });
  //     }
  //   });
  // }, []);

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

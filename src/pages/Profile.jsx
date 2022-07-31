import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import CodeInput from "../components/CodeInput";
import Navbar from "../components/Navbar";
import SnippetPost from "../components/SnippetPost";
import { auth, firestoreDb } from "../firebase";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [snippets, setSnippets] = useState();
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser({
            userId: user.uid,
            userProfile: user.photoURL,
            userName: user.displayName,
            userEmail: user.email,
          });
          getData(user.uid);
        } else {
          navigate("/", { replace: true });
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getData = (id) => {
    const q = query(
      collection(firestoreDb, "snippets"),
      where("userId", "==", id),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length > 0) {
        setSnippets(querySnapshot.docs);
        setStatus("finished");
      } else {
        setSnippets([]);
        setStatus("no data");
      }
    });
    return unsubscribe;
  };

  return (
    <>
      <Helmet>
        <title>Your Profile</title>
      </Helmet>
      <div>
        <Navbar />
        <div className="max-w-7xl 2xl:mx-auto mx-14 my-10">
          <h1 className="text-3xl font-medium">My Profile</h1>
          <div className="my-6">
            <div className="flex items-center gap-5">
              <img
                src={user?.userProfile}
                alt="profile"
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h2 className="text-3xl font-medium">{user?.userName}</h2>
                <h2 className="text-lg text-slate-400 font-medium">
                  {user?.userEmail}
                </h2>
              </div>
            </div>
            <div className="my-6">
              <CodeInput />
            </div>
            <div>
              {status === "loading" ? (
                <div className="text-3xl font-medium my-4 text-gray-300">
                  Getting Data...
                </div>
              ) : (
                <>
                  <h5 className="text-xl text-gray-200">
                    {snippets.length > 0 ? (
                      <>
                      You Have {snippets.length} Snippet
                      </> 
                    ) : (
                      <>
                      You dont have snippet yet, Lets create one
                      </>
                    )}
                    </h5>
                  <div className="w-full my-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import Explore from "./pages/Explore";
import Snippet from "./pages/Snippet";
import Tag from "./pages/Tag";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { userState } from "./atoms/userAtom";
import { useSetRecoilState } from "recoil";

function App() {
  const setUser = useSetRecoilState(userState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(user)
        setUser({
          userId: user.uid,
          userProfile: user.photoURL,
          userName: user.displayName,
        });
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {loading ? (
            <>Loading...</>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="snippet" element={<Explore />} />
              <Route path="snippet/:id" element={<Snippet />} />
              <Route path="me" element={<Profile />} />
              <Route path="user/:id" element={<Home />} />
              {/* <Route path="tag" element={<Home />} /> */}
              <Route path="tag/:id" element={<Tag />} />
              <Route path="search" element={<Search />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

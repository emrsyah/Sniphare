import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { toast } from "react-toastify";
import CodeInput from "../components/CodeInput";

const Home = () => {
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Success Login");
      navigate("/me");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Helmet>
        <title>Sniphare - Where Developer Find and Share Their Snippets</title>
      </Helmet>
      <div>
        <Navbar />
        <div className="relative overflow-hidden">
          <div className="h-32 w-32 bg-indigo-700 absolute blur-[100px]"></div>
          <div className="h-48 w-48 right-4 top-20 bg-indigo-700 absolute blur-[130px]"></div>
          <div className="relative z-10 mt-24 mb-16">
            {/* Hero */}
            <div className="flex flex-col mx-5 items-center justify-center">
              <h1 className="text-6xl tracking-wide font-bold text-center">
                Developer Snippet Homebase
              </h1>
              <p className="text-gray-300 mt-5 text-center text-xl">
                Where developer find and share their snippet, Share your snippet
                now.
              </p>
              <button
                onClick={() => loginHandler()}
                className="text-xl flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 py-3 px-6 mt-10 rounded font-medium"
              >
                <p>Start Sharing</p>
                <Icon icon="akar-icons:arrow-right" />
              </button>
            </div>

            {/* Code Input */}
            <CodeInput />

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

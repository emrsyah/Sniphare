import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const loginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Success Login");
      navigate("/me");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({
          userId: user.uid,
          userProfile: user.photoURL,
          userName: user.displayName,
        });
      }
    });
  }, []);

  return (
    <nav className="flex items-center px-10 py-4 justify-between border-b-[1px] border-gray-700">
      <Link to="/" className="text-xl nunito font-semibold">
        Sniphare🧁
      </Link>
      <div className="flex items-center gap-6">
        <Link
          to="/snippet"
          className={`font-medium hover:text-indigo-500 ${
            location.pathname === "/snippet" && "text-indigo-500"
          } `}
        >
          Explore
        </Link>
        {user ? (
          <div 
          onClick={()=>navigate('/me')}
          className="flex items-center cursor-pointer border-2 border-slate-800 hover:border-gray-500 gap-3 bg-slate-800 py-1 px-3 rounded-full">
            <img src={user.userProfile} className="w-9 h-9 rounded-full border-2 border-indigo-500" alt="" />
            <Icon icon="bxs:dashboard" width={28} className="text-indigo-400" />
          </div>
        ) : (
          <button
            onClick={() => loginHandler()}
            className="flex items-center gap-3 py-[6px] px-[10px] border-[1px] border-gray-500 rounded"
          >
            <Icon icon="akar-icons:google-fill" />
            Login Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

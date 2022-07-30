import React from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import {toast} from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate()

  const loginHandler = async () =>{
    try{
      await signInWithPopup(auth, googleProvider)
      toast.success("Success Login")
      navigate('/me')
    }catch(err){
      console.error(err)
    }
  }

  return (
    <nav className="flex items-center px-10 py-4 justify-between border-b-[1px] border-gray-700">
      <Link to="/" className="text-xl nunito font-semibold">Sniphare🧁</Link>
      <div className="flex items-center gap-6">
        <Link to="snippet" className="font-medium hover:text-indigo-500">
          Explore
        </Link>
        <button
        onClick={()=>loginHandler()}
        className="flex items-center gap-3 py-[6px] px-[10px] border-[1px] border-gray-500 rounded">
          <Icon icon="akar-icons:google-fill" />
          Login Google
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

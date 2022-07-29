import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center px-10 py-4 justify-between border-b-[1px] border-gray-700">
      <Link to="/" className="text-xl nunito font-semibold">Sniphare🧁</Link>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-4 py-[6px] px-[10px] border-[1px] border-gray-500 rounded">
          <Icon icon="akar-icons:github-fill" />
          Login Github
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

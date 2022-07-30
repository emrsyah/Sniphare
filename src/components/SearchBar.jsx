import React, { useState } from "react";
import { Icon } from "@iconify/react";

const SearchBar = () => {
  return (
    <form
    action="/search"
    className="flex items-center gap-1 bg-slate-800 px-4 rounded-sm border-[1px] border-gray-600 my-4">
      <Icon icon="eva:search-fill" width={20} />
      <input
        type="text"
        className="outline-none bg-transparent p-2 w-full"
        placeholder="How to center a div in CSS"
        name="q"
      />
    </form>
  );
};

export default SearchBar;

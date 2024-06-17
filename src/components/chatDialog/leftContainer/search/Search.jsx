import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";

function Search() {
  return (
    <div className="search bg-[#fff] h-[45px] border-b-[1px] border-[#f2f2f2] flex items-center">
       <div className="bg-[#f2f2f2] relative my-0 mx-[13px] w-[100%] rounded-[10px] overflow-hidden">

        <div className="Icon absolute h-[100%] py-[6px] px-[10px] text-[#919191]">
          <SearchIcon />
        </div>

        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-[100%] p-[16px] pl-[65px] text-[14px] h-[15px] bg-transparent outline-none"
        />
      </div>
      
    </div>
  );
}

export default Search;

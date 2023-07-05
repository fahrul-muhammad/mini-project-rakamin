import React, { useState } from "react";
import "./task.css";
import { FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";

const TaskCard = ({ style }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  return (
    <>
      <div style={style} className="container w-full border-[#e6e7e8] border-2 rounded-md bg-white h-max p-4 hover:cursor-grab active:cursor-grabbing mb-3">
        <p className="title xl:text-base lg:text-base">Re-designed the zero-g doggie bags. No more spills!</p>
        <hr className="my-2 dash" />
        <div className="container flex flex-row items-center justify-between w-full">
          <div className="w-[75%] bg-grey rounded-full h-3 ">
            <div
              className="h-3 rounded-full bg-turquoise"
              style={{
                width: "35%",
              }}
            ></div>
          </div>
          <p>35%</p>
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-[25px] h-[25px] hover:bg-grey flex items-center flex-row justify-center rounded-md">
            <p className="mb-2.5 text-xl hover:cursor-pointer text-center text-[#757575]">...</p>
            {/* OPEN MENU 3 DOTS OR OPTIONS */}
            <div className="relative">
              <div hidden={isMenuOpen} className="absolute z-10 w-56 mt-2 bg-white border border-gray-100 divide-y divide-gray-100 rounded-md shadow-lg end-0 top-2" role="menu">
                <div className="p-2">
                  <div className="flex flex-row items-center">
                    <FaArrowRight className="text-sm text-gray-800" />
                    <a href="#" className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:bg-gray-50 hover:text-gray-1000" role="menuitem">
                      Move Right
                    </a>
                  </div>

                  <div className="flex flex-row items-center">
                    <FaEdit className="text-sm text-gray-800" />
                    <a href="#" className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:bg-gray-50 hover:text-gray-1000" role="menuitem">
                      Edit
                    </a>
                  </div>

                  <div className="flex flex-row items-center">
                    <FaTrash className="text-sm text-red-600" />
                    <a href="#" className="block px-2 py-2 text-sm text-red-600 rounded-lg hover:bg-gray-50 hover:text-gray-1000" role="menuitem">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;

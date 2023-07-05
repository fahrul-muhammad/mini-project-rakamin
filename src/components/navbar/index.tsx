import React from "react";
import "./navbar.css";
import { IoMdAdd } from "react-icons/io";

interface Props {
  onPress: () => void;
}

const NavbarComponent = ({ onPress }: Props) => {
  return (
    <>
      <nav className="flex container flex-row h-[8vh] items-center ">
        <p className="pl-10 font-extrabold brand sm:text-sm base:text-base lg:text-xl">Product Roadmap</p>
        <button onClick={onPress} className="ml-5 flex flex-row items-center bg-turquoise h-[50px] p-2 rounded-md justify-center">
          <IoMdAdd className="text-lg font-bold text-white" />
          <p className="ml-2 text-white">Add New Group</p>
        </button>
      </nav>
    </>
  );
};

export default NavbarComponent;

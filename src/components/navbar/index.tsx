import React from "react";
import "./navbar.css";

const NavbarComponent: React.FC = () => {
  return (
    <>
      <nav className="flex container flex-col h-[8vh] justify-center ">
        <p className="brand pl-10 sm:text-sm base:text-base lg:text-xl font-extrabold">Product Roadmap</p>
      </nav>
    </>
  );
};

export default NavbarComponent;

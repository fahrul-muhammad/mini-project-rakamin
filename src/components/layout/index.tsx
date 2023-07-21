import React, { Children } from "react";
import NavbarComponent from "../navbar";
import KanbanBoard from "../kanbanBoard";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  setLoading: (value: boolean) => void;
  getNewBoard: () => void;
}

const LayoutComponent = ({ children, setLoading, getNewBoard }: Props) => {
  return (
    <>
      <NavbarComponent getNewBoard={getNewBoard} setLoading={setLoading} />
      <div className="flex w-[100vw] flex-row min-h-[10vh] py-[1.5rem] border-t-2 mobile:px-1 px-[2.5rem]  ">{children}</div>
    </>
  );
};

export default LayoutComponent;

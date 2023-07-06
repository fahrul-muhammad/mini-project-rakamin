import React, { Children } from "react";
import NavbarComponent from "../navbar";
import KanbanBoard from "../kanbanBoard";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  setLoading: (value: boolean) => void;
}

const LayoutComponent = ({ children, setLoading }: Props) => {
  return (
    <>
      <NavbarComponent setLoading={setLoading} />
      <div>
        <div className="flex w-[100vw] flex-row min-h-[90vh] py-[1.5rem] border-t-2 mobile:px-1 px-[2.5rem] ">{children}</div>
      </div>
    </>
  );
};

export default LayoutComponent;

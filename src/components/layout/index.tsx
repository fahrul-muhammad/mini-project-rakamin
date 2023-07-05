import React, { Children } from "react";
import NavbarComponent from "../navbar";
import "./layout.css";
import KanbanBoard from "../kanbanBoard";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  onPress: () => void;
}

const LayoutComponent = ({ children, onPress }: Props) => {
  return (
    <>
      <NavbarComponent onPress={onPress} />
      <div>
        <div className="flex  min-w-fit flex-row min-h-[90vh] py-[1.5rem] border-t-2 px-[2.5rem] border-t-softGrey">{children}</div>
      </div>
    </>
  );
};

export default LayoutComponent;

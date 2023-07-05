import React, { useState } from "react";
import "./kanban.css";
import TaskCard from "../task";
import { IoMdClose } from "react-icons/io";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  onPress: () => void;
  style: any;
}

const KanbanBoardComponent = ({ children, onPress, style }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div style={style} className="container flex flex-col bg-[#f7feff] border-[#77c7cd] border-2 px-[1rem] py-[1rem] rounded-md w-[400px] mr-[30px] h-max">
      <div className="container h-max w-max group-task border-[#77c7cd] border-2 rounded-md ">
        <p className="p-3">Group Task 1</p>
      </div>
      <p className="pt-2 font-medium">April - June</p>
      {children}
      <div className="flex flex-row items-center hover:cursor-pointer w-max" onClick={onPress} /* onClick={() => setShowModal(true)} */>
        <div className=" bg-white rounded-[50%] border-2 h-[20px] w-[20px] flex justify-center border-blueGray-950 items-center mt-3">
          <p className="mb-0.5">+</p>
        </div>
        <p className="mt-2.5 ml-2.5">New Task</p>
      </div>
      {/* MODAL */}
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative w-[50vh] flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center px-2 py-4 border-b border-solid rounded-t border-slate-200">
                  <div className="flex flex-row items-center justify-between w-full">
                    <h3 className="text-lg text-3xl font-semibold">Create Task</h3>
                    <IoMdClose className="text-xl text-bold hover:cursor-pointer " onClick={() => setShowModal(false)} />
                  </div>
                  <button className="float-right p-1 ml-[-1rem] text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none" onClick={() => setShowModal(false)}>
                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <p className="mb-3">Task Name</p>
                  <input type="text" placeholder="Type Your Task" className="relative w-full px-3 py-3 text-sm placeholder-gray-400 bg-white border border-gray-600 rounded outline-none text-slate-500 focus:outline-none focus:ring" />
                  <p className="mt-3 mb-3">Progress</p>
                  <input type="text" placeholder="70%" className="relative w-[50%] px-3 py-3 text-sm bg-white border rounded outline-none placeholder-gray-400 text-slate-600 border-gray-500 focus:outline-none focus:ring" />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="px-6 py-3 mb-1 mr-2 text-sm font-bold text-gray-700 uppercase transition-all duration-150 ease-linear bg-white border-2 border-gray-700 rounded shadow outline-none hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-turquoise active:bg-turquoise hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
      {/* MODAL END */}
    </div>
  );
};

export default KanbanBoardComponent;

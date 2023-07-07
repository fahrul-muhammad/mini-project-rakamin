import React, { useState, useContext } from "react";
import { FaArrowRight, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import items from "../../axios/items";
import { AiFillCheckCircle } from "react-icons/ai";
import authContext from "../../authContext";

interface Props {
  title: string;
  style: any;
  boardIndex: number;
  progress_percentage: number;
  onDelete: () => void;
  onEdit: () => void;
  onMoveRight: (boardIdx: number, taskId: any, taskIdx: any) => void;
  onMoveLeft: (boardIdx: number, taskId: any, taskIdx: any) => void;
  setLoading: (status: boolean) => void;
  todoId: number;
  name: string;
  progress: number;
  taskId: number;
  taskIdx: number;
  isFirstIndex: boolean;
  isLastIndex: any;
}

const TaskCard = ({ taskIdx, isFirstIndex, isLastIndex, boardIndex, style, title, progress_percentage, onDelete, onMoveRight, todoId, name, progress, taskId, setLoading, onMoveLeft }: Props) => {
  const { authToken } = useContext(authContext);
  const storageToken = localStorage.getItem("token") as string;
  const tokenss = JSON.parse(storageToken) || authToken;

  const apiItems = items(tokenss);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [body, setBody] = useState({
    target_todo_id: todoId,
    name: name,
    progress_percentage: progress,
  });

  return (
    <>
      <div style={style} className="container w-full border-[#e6e7e8] border-2 rounded-md bg-white h-max p-4 hover:cursor-grab active:cursor-grabbing mb-3">
        <p className="title xl:text-base lg:text-base">{title}</p>
        <hr className="my-2 dash" />
        <div className="container flex flex-row items-center justify-between w-full">
          <div className="w-[75%] bg-grey rounded-full h-3 ">
            <div
              className={`h-3 rounded-full ${progress_percentage < 100 ? "bg-turquoise " : "bg-[#43936c]"}`}
              style={{
                width: `${progress_percentage}%`,
              }}
            ></div>
          </div>
          {progress_percentage < 100 ? <p>{progress_percentage}%</p> : <AiFillCheckCircle className="text-[#43936c] text-xl" />}

          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-[25px] h-[25px] hover:bg-grey flex items-center flex-row justify-center rounded-md">
            <p className="mb-2.5 text-xl hover:cursor-pointer text-center text-[#757575]">...</p>
            {/* OPEN MENU 3 DOTS OR OPTIONS */}
            <div className="relative">
              <div hidden={isMenuOpen} className="absolute z-10 w-56 mt-2 bg-white border border-gray-100 divide-y divide-gray-100 rounded-md shadow-lg end-0 top-2" role="menu">
                <div className="p-2">
                  {!isLastIndex && (
                    <button
                      className="flex flex-row items-center"
                      onClick={() => {
                        onMoveRight(boardIndex, taskId, taskIdx);
                      }}
                    >
                      <FaArrowRight className="text-sm text-gray-800" />
                      <p className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:bg-gray-50 hover:text-gray-1000" role="menuitem">
                        Move Right
                      </p>
                    </button>
                  )}
                  {isFirstIndex && isLastIndex && (
                    <>
                      <button
                        className="flex flex-row items-center"
                        onClick={() => {
                          onMoveRight(boardIndex, taskId, taskIdx);
                        }}
                      >
                        <FaArrowRight className="text-sm text-gray-800" />
                        <p className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:bg-gray-50 hover:text-gray-1000" role="menuitem">
                          Move Right
                        </p>
                      </button>
                      <button
                        className="flex flex-row items-center"
                        onClick={() => {
                          onMoveLeft(boardIndex, taskId, taskIdx);
                        }}
                      >
                        <FaArrowLeft className="text-sm text-gray-800" />
                        <p className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:bg-gray-50 hover:text-gray-1000" role="menuitem">
                          Move Left
                        </p>
                      </button>
                    </>
                  )}
                  {!isFirstIndex && (
                    <button
                      className="flex flex-row items-center"
                      onClick={() => {
                        onMoveLeft(boardIndex, taskId, taskIdx);
                      }}
                    >
                      <FaArrowLeft className="text-sm text-gray-800" />
                      <p className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:bg-gray-50 hover:text-gray-1000" role="menuitem">
                        Move Left
                      </p>
                    </button>
                  )}

                  <button className="flex flex-row items-center" onClick={() => setShowModal(true)}>
                    <FaEdit className="text-sm text-gray-800" />
                    <p className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:bg-gray-50 hover:text-gray-1000" role="menuitem">
                      Edit
                    </p>
                  </button>

                  <button className="flex flex-row items-center" onClick={onDelete}>
                    <FaTrash className="text-sm text-red-600" />
                    <p className="block px-2 py-2 text-sm text-red-600 rounded-lg hover:bg-gray-50 hover:text-gray-1000" role="menuitem">
                      Delete
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                    <h3 className="text-lg text-3xl font-semibold">Edit Task</h3>
                    <IoMdClose className="text-xl text-bold hover:cursor-pointer " onClick={() => setShowModal(false)} />
                  </div>
                  <button className="float-right p-1 ml-[-1rem] text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none" onClick={() => setShowModal(false)}>
                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <p className="mb-3">Task Name</p>
                  <input
                    onChange={(e: any) => {
                      setBody({
                        ...body,
                        name: e.target.value,
                      });
                    }}
                    type="text"
                    value={body.name}
                    placeholder="Type Your Task"
                    className="relative w-full px-3 py-3 text-sm placeholder-gray-400 bg-white border border-gray-600 rounded outline-none text-slate-800 placeholder:text-slate-600 focus:outline-none focus:ring"
                  />
                  <p className="mt-3 mb-3">Progress</p>
                  <input
                    onChange={(e: any) =>
                      setBody({
                        ...body,
                        progress_percentage: Number(e.target.value),
                      })
                    }
                    type="text"
                    value={body.progress_percentage}
                    placeholder="70%"
                    className="relative w-[50%] px-3 py-3 text-sm bg-white border rounded outline-none placeholder-gray-400 text-slate-800  placeholder:text-slate-600  border-gray-500 focus:outline-none focus:ring"
                  />
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
                    onClick={async () => {
                      setLoading(true);
                      await apiItems
                        .patchTask(body, todoId, taskId)
                        .then(() => {
                          setLoading(false);
                        })
                        .catch(() => {
                          setLoading(false);
                        });
                      setShowModal(false);
                    }}
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
    </>
  );
};

export default TaskCard;

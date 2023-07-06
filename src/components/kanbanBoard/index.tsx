import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { postNewTask } from "../../axios/items/postTask";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  onPress: () => void;
  style: any;
  title: string;
  description: string;
  todoId: number;
  ref: any;
  taskLength: number;
  setLoading: (status: boolean) => void;
  colorId: number;
}

const KanbanBoardComponent = ({ colorId, setLoading, taskLength, children, onPress, style, title, description, todoId, ref }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [body, setBody] = useState({
    name: "",
    progress_percentage: 0,
  });

  const colorTempt = [
    {
      bg: "#f7feff",
      bd: "#2da7af",
    },
    {
      bg: "#fffcf3",
      bd: "#feeec7",
    },
    {
      bg: "#fffafa",
      bd: "#f7bec3",
    },
    {
      bg: "#f8fbf9",
      bd: "#c4e1d3",
    },
  ];

  return (
    <div
      ref={ref}
      style={{
        borderColor: colorTempt[colorId].bd,
        backgroundColor: colorTempt[colorId].bg,
      }}
      className={`container flex flex-col my-5 pc:mx-5 laptop:mx-4  border-2 px-[1rem] py-[1rem] rounded-md laptop:w-[400px] pc:w-[400px] mobile:mr-0 mr-[30px] h-max`}
    >
      <div
        className={`container h-max w-max group-task  border-2 rounded-md `}
        style={{
          borderColor: colorTempt[colorId].bd,
        }}
      >
        <p
          className={`p-3 font-medium `}
          style={{
            color: "#656665",
          }}
        >
          {title}
        </p>
      </div>
      <p className="pt-2 font-medium">{description}</p>
      {taskLength == 0 && (
        <>
          <div className="flex my-2 items-center w-full h-[5vh] bg-neutral-50 rounded-md  border-2 border-[#e6e6e6]">
            <p className="pl-3 text-darkGrey">No Task</p>
          </div>
        </>
      )}
      {children}
      <div className="flex flex-row items-center hover:cursor-pointer w-max" onClick={() => setShowModal(true)}>
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
                  <input
                    onChange={(e: any) =>
                      setBody({
                        ...body,
                        name: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Type Your Task"
                    className="relative w-full px-3 py-3 text-sm placeholder-gray-400 bg-white border border-gray-600 rounded outline-none text-slate-800 focus:outline-none focus:ring placeholder:text-slate-600"
                  />
                  <p className="mt-3 mb-3">Progress</p>
                  <input
                    onChange={(e: any) =>
                      setBody({
                        ...body,
                        progress_percentage: e.target.value,
                      })
                    }
                    type="number"
                    placeholder="70%"
                    className="relative w-[50%] px-3 py-3 text-sm bg-white border rounded outline-none placeholder-gray-400 text-slate-800  placeholder:text-slate-600 border-gray-500 focus:outline-none focus:ring"
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
                      await postNewTask(todoId, body.name, body.progress_percentage)
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
    </div>
  );
};

export default KanbanBoardComponent;

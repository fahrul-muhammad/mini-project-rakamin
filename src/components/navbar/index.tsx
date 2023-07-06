import React, { useState } from "react";
import "./navbar.css";
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { postNewTodos } from "../../axios/todos/postNewTodo";

interface Props {
  setLoading: (status: boolean) => void;
}

const NavbarComponent = ({ setLoading }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [body, setBody] = useState({
    title: "",
    description: "",
  });
  return (
    <>
      <nav className="flex container flex-row h-[8vh] items-center ">
        <p className="pl-10 font-extrabold brand sm:text-sm base:text-base lg:text-xl">Product Roadmap</p>
        <button onClick={() => setShowModal(true)} className="ml-5 flex flex-row items-center bg-turquoise h-[50px] p-2 rounded-md justify-center">
          <IoMdAdd className="text-lg font-bold text-white" />
          <p className="ml-2 text-white">Add New Group</p>
        </button>
      </nav>
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
                  <p className="mb-3">Group Title</p>
                  <input
                    onChange={(e: any) =>
                      setBody({
                        ...body,
                        title: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Type Your group title"
                    className="relative w-full px-3 py-3 text-sm placeholder-gray-400 bg-white border border-gray-600 rounded outline-none text-slate-800 focus:outline-none focus:ring placeholder:text-slate-600"
                  />
                  <p className="mt-3 mb-3">Description</p>
                  <input
                    onChange={(e: any) =>
                      setBody({
                        ...body,
                        description: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Type your description"
                    className="relative w-[50%] px-3 py-3 text-sm bg-white border rounded outline-none placeholder-gray-400 text-slate-800  placeholder:text-slate-600 border-gray-500 focus:outline-none focus:ring"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="px-6 py-3 mb-1 mr-2 text-sm font-bold text-gray-700 uppercase transition-all duration-150 ease-linear bg-white border-2 border-gray-700 rounded shadow outline-none hover:shadow-lg focus:outline-none"
                    type="button"
                    // onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-turquoise active:bg-turquoise hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={async () => {
                      setLoading(true);
                      await postNewTodos(body)
                        .then(() => {
                          setLoading(false);
                        })
                        .catch(() => {
                          setLoading(false);
                        });
                      setShowModal(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export default NavbarComponent;

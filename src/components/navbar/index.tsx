import React, { useState, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { postNewTodos } from "../../axios/todos/postNewTodo";
import authContext from "../../authContext";
import { ModalComponent as Modal } from "../modal/taskModal";

interface Props {
  setLoading: (status: boolean) => void;
  getNewBoard: () => void;
}

const NavbarComponent = ({ setLoading, getNewBoard }: Props) => {
  const { authToken } = useContext(authContext);
  const storageToken = localStorage.getItem("token") as string;
  const tokenss = JSON.parse(storageToken) || authToken;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [body, setBody] = useState({
    title: "",
    description: "",
  });
  return (
    <>
      <nav className="flex container flex-row h-[8vh] items-center w-[100%] ">
        <p className="pl-10 font-extrabold brand sm:text-sm base:text-base lg:text-xl">Product Roadmap</p>
        <button onClick={() => setShowModal(true)} className="ml-5 flex flex-row items-center bg-turquoise h-[50px] p-2 rounded-md justify-center">
          <IoMdAdd className="text-lg font-bold text-white" />
          <p className="ml-2 text-white">Add New Group</p>
        </button>
      </nav>
      {showModal ? (
        <Modal
          firstInputValue=""
          secondInputValue=""
          onChangeFirstInput={(value) =>
            setBody({
              ...body,
              title: value,
            })
          }
          onChangeSecondInput={(value) =>
            setBody({
              ...body,
              description: value,
            })
          }
          onClose={() => setShowModal(false)}
          title="Add New Group"
          useApi={async () => {
            setLoading(true);
            setShowModal(false);

            await postNewTodos(body, tokenss)
              .then(() => {
                setLoading(false);
                getNewBoard();
                setShowModal(false);
              })
              .catch(() => {
                setShowModal(true);
                setLoading(false);
              });
            setShowModal(false);
          }}
          useDescription={true}
        />
      ) : null}
    </>
  );
};

export default NavbarComponent;

import { useState, useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import todos from "../../axios/todos";
import authContext from "../../context/authContext";
import { ModalComponent as Modal } from "../modal/taskModal";
import { useComponentVisible } from "../../utils";

interface Props {
  setLoading: (status: boolean) => void;
  getNewBoard: () => void;
}

const NavbarComponent = ({ setLoading, getNewBoard }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [body, setBody] = useState({
    title: "",
    description: "",
  });

  const { authToken } = useContext(authContext);
  const storageToken = localStorage.getItem("token") as string;
  const token = JSON.parse(storageToken) || authToken;
  const apiTodos = todos(token);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  return (
    <>
      <nav className="flex container flex-row h-[8vh] items-center w-[100%] ">
        <p className="pl-10 font-extrabold brand sm:text-sm base:text-base lg:text-xl">Product Roadmap</p>
        <button onClick={() => setIsComponentVisible(true)} className="ml-5 flex flex-row items-center bg-turquoise h-[50px] p-2 rounded-md justify-center">
          <IoMdAdd className="text-lg font-bold text-white" />
          <p className="ml-2 text-white">Add New Group</p>
        </button>
      </nav>
      {isComponentVisible ? (
        <Modal
          useRef={ref}
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
          onClose={() => setIsComponentVisible(false)}
          title="Add New Group"
          useApi={async () => {
            setLoading(true);
            setIsComponentVisible(false);

            await apiTodos
              .postNewTodos(body)
              .then(() => {
                setLoading(false);
                getNewBoard();
                setIsComponentVisible(false);
              })
              .catch(() => {
                setIsComponentVisible(true);
                setLoading(false);
              });
            setIsComponentVisible(false);
          }}
          useDescription={true}
        />
      ) : null}
    </>
  );
};

export default NavbarComponent;

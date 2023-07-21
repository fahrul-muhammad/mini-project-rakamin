import React, { useState, useContext } from "react";
import items from "../../axios/items";
import authContext from "../../authContext";
import { ModalComponent as Modal } from "../../components/modal/taskModal";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  style: any;
  title: string;
  description: string;
  todoId: number;
  taskLength: number;
  setLoading: (status: boolean) => void;
  colorId: number;
}

const KanbanBoardComponent = (props: Props) => {
  const { colorId, setLoading, taskLength, children, title, description, todoId } = props;
  const { authToken } = useContext(authContext);
  const storageToken = localStorage.getItem("token") as string;
  const token = JSON.parse(storageToken) || authToken;
  const apiItems = items(token);

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
      style={{
        borderColor: colorTempt[colorId].bd,
        backgroundColor: colorTempt[colorId].bg,
      }}
      className="container flex flex-col my-5 pc:mx-5 laptop:mx-4 border-2 px-[1rem] py-[1rem] rounded-md laptop:w-[20vw] pc:w-[20vw] mobile:mr-0 mr-[30px] mobile:h-max tablet:mr-3 tablet:w-[42vw] mobile:w-[100vw] "
    >
      <div
        className="container border-2 rounded-md h-max w-max group-task "
        style={{
          borderColor: colorTempt[colorId].bd,
        }}
      >
        <p
          className="p-3 font-medium"
          style={{
            color: "#656665",
          }}
        >
          {title}
        </p>
      </div>
      <p className="pt-2 font-medium capitalize">{description}</p>
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
      {showModal ? (
        <Modal
          firstInputValue=""
          secondInputValue={0}
          onClose={() => setShowModal(false)}
          title="Task Name"
          onChangeFirstInput={(value) =>
            setBody({
              ...body,
              name: value,
            })
          }
          onChangeSecondInput={(value) =>
            setBody({
              ...body,
              progress_percentage: value,
            })
          }
          useApi={async () => {
            setLoading(true);
            await apiItems
              .postTask(todoId, body.name, body.progress_percentage)
              .then(() => {
                setLoading(false);
                setShowModal(false);
              })
              .catch(() => {
                setLoading(false);
                setShowModal(true);
              });
          }}
          useDescription={false}
        />
      ) : null}
    </div>
  );
};

export default KanbanBoardComponent;

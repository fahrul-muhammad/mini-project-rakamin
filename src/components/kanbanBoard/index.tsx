import React, { useState, useContext } from "react";
import items from "../../axios/items";
import authContext from "../../context/authContext";
import { colorTempt } from "../../utils";
import { ModalComponent as Modal } from "../../components";
import { useComponentVisible } from "../../utils";

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
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const storageToken = localStorage.getItem("token") as string;
  const token = JSON.parse(storageToken) || authToken;
  const apiItems = items(token);
  const [body, setBody] = useState({
    name: "",
    progress_percentage: 0,
  });

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
            color: colorTempt[colorId].title,
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
      <div className="flex flex-row items-center hover:cursor-pointer w-max" onClick={() => setIsComponentVisible(true)}>
        <div className=" bg-white rounded-[50%] border-2 h-[20px] w-[20px] flex justify-center border-blueGray-950 items-center mt-3">
          <p className="mb-0.5">+</p>
        </div>
        <p className="mt-2.5 ml-2.5">New Task</p>
      </div>
      {isComponentVisible ? (
        <Modal
          useRef={ref}
          firstInputValue=""
          secondInputValue={0}
          onClose={() => setIsComponentVisible(false)}
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
                setIsComponentVisible(false);
              })
              .catch(() => {
                setLoading(false);
                setIsComponentVisible(true);
              });
          }}
          useDescription={false}
        />
      ) : null}
    </div>
  );
};

export default KanbanBoardComponent;

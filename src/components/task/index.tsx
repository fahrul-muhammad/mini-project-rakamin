import { useState, useContext } from "react";
import { FaArrowRight, FaArrowLeft, FaTrash } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import items from "../../axios/items";
import { AiFillCheckCircle } from "react-icons/ai";
import authContext from "../../context/authContext";

import { ModalComponent as Modal, DeleteModalComponent as ModalDelete } from "../../components";
import { handleStyleHover, useComponentVisible } from "../../utils";

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
  length: number;
}

const TaskCard = (props: Props) => {
  const { length, taskIdx, isFirstIndex, isLastIndex, boardIndex, style, title, progress_percentage, onDelete, onMoveRight, todoId, name, progress, taskId, setLoading, onMoveLeft } = props;
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const { authToken } = useContext(authContext);
  const storageToken = localStorage.getItem("token") as string;
  const token = JSON.parse(storageToken) || authToken;
  const apiItems = items(token);
  const barWidth = progress_percentage >= 100 ? "100%" : `${progress_percentage}%`;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [body, setBody] = useState({
    target_todo_id: todoId,
    name: name,
    progress_percentage: progress,
  });

  const [editBtnHover, setEditBtnHover] = useState(false);
  const [moveLeftBtnHover, setMoveLeftBtnHover] = useState(false);
  const [moveRightBtnHover, setMoveRightBtnHover] = useState(false);

  return (
    <>
      <div style={style} className="container w-full border-[#e6e7e8] mt-2 border-2 rounded-md bg-white h-max p-4 hover:cursor-grab active:cursor-grabbing mb-3">
        <p className="title xl:text-base lg:text-base">{title}</p>
        <hr className="my-2 dash" />
        <div className="container flex flex-row items-center justify-between w-full">
          <div className="w-[75%] bg-grey rounded-full h-3 ">
            <div
              className={`h-3 rounded-full ${progress_percentage < 100 ? "bg-turquoise " : "bg-[#43936c]"}`}
              style={{
                width: barWidth,
              }}
            ></div>
          </div>
          {progress_percentage < 100 ? <p>{progress_percentage}%</p> : <AiFillCheckCircle className="text-[#43936c] text-xl" />}
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-[25px] h-[25px] hover:bg-grey flex items-center flex-row justify-center rounded-md">
            <p className="mb-2.5 text-xl hover:cursor-pointer text-center text-[#757575]">...</p>
            <div className="relative">
              <div hidden={isMenuOpen} className="absolute z-10 w-56 mt-2 bg-white border border-gray-100 divide-y divide-gray-100 rounded-md shadow-lg end-0 top-2" role="menu">
                <div className="p-2 ">
                  {!isLastIndex && (
                    <button
                      className="flex flex-row items-center w-full "
                      onClick={() => {
                        onMoveRight(boardIndex, taskId, taskIdx);
                      }}
                      onMouseEnter={() => setMoveRightBtnHover(true)}
                      onMouseLeave={() => setMoveRightBtnHover(false)}
                    >
                      <FaArrowRight style={handleStyleHover(moveRightBtnHover)} className="text-sm text-gray-800" />
                      <p style={handleStyleHover(moveRightBtnHover)} className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:text-gray-1000" role="menuitem">
                        Move Right
                      </p>
                    </button>
                  )}
                  {length > 1 && isFirstIndex && isLastIndex && (
                    <>
                      <button
                        className="flex flex-row items-center w-full "
                        onClick={() => {
                          onMoveRight(boardIndex, taskId, taskIdx);
                        }}
                        onMouseEnter={() => setMoveRightBtnHover(true)}
                        onMouseLeave={() => setMoveRightBtnHover(false)}
                      >
                        <FaArrowRight style={handleStyleHover(moveRightBtnHover)} className="text-sm text-gray-800" />
                        <p style={handleStyleHover(moveRightBtnHover)} className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:text-gray-1000" role="menuitem">
                          Move Right
                        </p>
                      </button>
                      <button
                        className="flex flex-row items-center w-full "
                        onClick={() => {
                          onMoveLeft(boardIndex, taskId, taskIdx);
                        }}
                        onMouseEnter={() => setMoveLeftBtnHover(true)}
                        onMouseLeave={() => setMoveLeftBtnHover(false)}
                      >
                        <FaArrowLeft style={handleStyleHover(moveLeftBtnHover)} className="text-sm text-gray-800" />
                        <p style={handleStyleHover(moveLeftBtnHover)} className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:text-gray-1000" role="menuitem">
                          Move Left
                        </p>
                      </button>
                    </>
                  )}
                  {!isFirstIndex && (
                    <button
                      className="flex flex-row items-center w-full"
                      onClick={() => {
                        onMoveLeft(boardIndex, taskId, taskIdx);
                      }}
                      onMouseEnter={() => setMoveLeftBtnHover(true)}
                      onMouseLeave={() => setMoveLeftBtnHover(false)}
                    >
                      <FaArrowLeft style={handleStyleHover(moveLeftBtnHover)} className="text-sm text-gray-800" />
                      <p style={handleStyleHover(moveLeftBtnHover)} className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:text-gray-1000" role="menuitem">
                        Move Left
                      </p>
                    </button>
                  )}
                  <button onMouseEnter={() => setEditBtnHover(true)} onMouseLeave={() => setEditBtnHover(false)} className="flex flex-row items-center w-full " onClick={() => setIsComponentVisible(true)}>
                    <BiEditAlt className="text-base text-gray-800" style={handleStyleHover(editBtnHover)} />
                    <p style={handleStyleHover(editBtnHover)} className="block px-2 py-2 text-sm text-gray-800 rounded-lg hover:text-gray-1000" role="menuitem">
                      Edit
                    </p>
                  </button>
                  <button className="flex flex-row items-center w-full" onClick={() => setShowDeleteModal(true)}>
                    <FaTrash className="text-sm text-red-600" />
                    <p className="block px-2 py-2 text-sm text-red-600 rounded-lg hover:text-gray-1000" role="menuitem">
                      Delete
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isComponentVisible ? (
        <Modal
          useRef={ref}
          onClose={() => setIsComponentVisible(false)}
          useApi={async () => {
            setLoading(true);
            await apiItems
              .patchTask(body, todoId, taskId)
              .then(() => {
                setLoading(false);
              })
              .catch(() => {
                setLoading(false);
              });
            setIsComponentVisible(false);
          }}
          title="Edit Task"
          onChangeFirstInput={(value) =>
            setBody({
              ...body,
              name: value,
            })
          }
          onChangeSecondInput={(value) => setBody({ ...body, progress_percentage: value })}
          useDescription={false}
          firstInputValue={body.name}
          secondInputValue={body.progress_percentage}
        />
      ) : null}
      {showDeleteModal ? <ModalDelete onClose={() => setShowDeleteModal(false)} useApi={onDelete} /> : null}
    </>
  );
};

export default TaskCard;

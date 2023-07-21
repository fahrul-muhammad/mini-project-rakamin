import { TaskCard, kanbanBoardComponent as KanbanCard, LayoutComponent as Layout, LoadingIndicator as Loading } from "../../components";
import { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import todos from "../../axios/todos";
import { useNavigate } from "react-router-dom";
import authContext from "../../context/authContext";
import items from "../../axios/items";
import { reorder, move, getListStyle } from "../../utils";

function Home() {
  const [board, setBoard] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { authToken } = useContext(authContext);
  const storageToken = localStorage.getItem("token") as string;
  const token = JSON.parse(storageToken) || authToken;
  const navigate = useNavigate();
  const apiTask = items(token);
  const apiTodos = todos(token);

  const getData = async () => {
    try {
      const temp: any = [];
      const todos = await apiTodos?.getDataTodos();
      if (todos?.length <= 0) {
        return setIsLoading(false);
      }
      if (Array.isArray(todos) && todos.length) {
        for await (const todo of todos) {
          await apiTask.getTask(todo.id).then((task) => {
            temp.push({
              ...todo,
              task,
            });
            setIsLoading(false);
          });
        }
        setBoard(temp);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (isLoading && token) {
      getData();
    }
  }, [isLoading]);

  function onDragEnd(result: any) {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(board[sInd].task, source.index, destination.index);
      const newState: any = [...board];
      newState[sInd].task = items;
      setBoard(newState);
    } else {
      const result = move(board[sInd].task, board[dInd].task, source, destination);
      const newState = [...board];
      newState[sInd].task = result[sInd];
      newState[dInd].task = result[dInd];

      const sourceBoard = newState[sInd].id;
      const destBoard = newState[dInd].id;
      apiTask
        .patchTask({ target_todo_id: destBoard }, sourceBoard, draggableId)
        .then(() => {})
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
      setBoard(newState);
    }
  }

  const onMoveRightClick = (boardIndex: number, taskId: any, taskIdx: any) => {
    const newBoard: any = [...board];
    const sInd = boardIndex;
    const dInd = boardIndex + 1;
    const source = {
      droppableId: sInd,
      index: taskIdx,
    };
    const destination = {
      droppableId: dInd,
      index: newBoard[dInd].task.length,
    };

    const result = move(board[sInd].task, board[dInd].task, source, destination);
    const newState = [...board];
    newState[sInd].task = result[sInd];
    newState[dInd].task = result[dInd];

    const sourceBoard = newState[sInd].id;
    const destBoard = newState[dInd].id;
    apiTask
      .patchTask({ target_todo_id: destBoard }, sourceBoard, taskId)
      .then(() => {})
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    setBoard(newState);
  };

  const onMoveLeftClick = (boardIndex: number, taskId: any, taskIdx: any) => {
    const newBoard: any = [...board];
    const sInd = boardIndex;
    const dInd = boardIndex - 1;
    const source = {
      droppableId: sInd,
      index: taskIdx,
    };
    const destination = {
      droppableId: dInd,
      index: newBoard[dInd].task.length,
    };

    const result = move(board[sInd].task, board[dInd].task, source, destination);
    const newState = [...board];
    newState[sInd].task = result[sInd];
    newState[dInd].task = result[dInd];

    const sourceBoard = newState[sInd].id;
    const destBoard = newState[dInd].id;
    apiTask
      .patchTask({ target_todo_id: destBoard }, sourceBoard, taskId)
      .then(() => {})
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    setBoard(newState);
  };

  return (
    <Layout
      setLoading={(value) => {
        setIsLoading(value);
      }}
      getNewBoard={getData}
    >
      <DragDropContext
        onDragEnd={(e) => {
          onDragEnd(e);
        }}
      >
        {board.length <= 0 && !isLoading ? (
          <div className="flex items-center justify-center w-full ">
            <p>No Group Task</p>
          </div>
        ) : (
          <div className="flex w-screen pc:flex-row laptop:flex-row tablet:flex-row mobile:flex-col tablet:flex-wrap pc:justify-normal tablet:justify-between laptop:justify-normal mobile:justify-center">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {board.map((val: any, ind: number) => {
                  return (
                    <Droppable key={ind} droppableId={`${ind}`}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          <KanbanCard
                            colorId={ind}
                            taskLength={val.task.length}
                            todoId={val.id}
                            style={getListStyle()}
                            {...provided.droppableProps}
                            setLoading={(status: boolean) => {
                              setIsLoading(status);
                            }}
                            title={val?.title}
                            description={val?.description}
                          >
                            {val?.task?.lengt <= 0
                              ? null
                              : val?.task?.map((item: any, index: any) => (
                                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided, _) => (
                                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <TaskCard
                                          length={board.length}
                                          isFirstIndex={board[0] === val}
                                          isLastIndex={board[board.length - 1] === val}
                                          onDelete={async () => {
                                            setIsLoading(true);
                                            await apiTask.deleteTask(item.id, val.id).then(() => {
                                              setIsLoading(false);
                                            });
                                          }}
                                          setLoading={(status: boolean) => {
                                            setIsLoading(status);
                                          }}
                                          boardIndex={ind}
                                          taskIdx={index}
                                          taskId={item.id}
                                          name={item.name}
                                          progress={item.progress_percentage}
                                          todoId={val.id}
                                          onEdit={() => {}}
                                          onMoveRight={onMoveRightClick}
                                          onMoveLeft={onMoveLeftClick}
                                          title={item.name}
                                          progress_percentage={item.progress_percentage}
                                          style={null}
                                        />
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                          </KanbanCard>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </>
            )}
          </div>
        )}
      </DragDropContext>
    </Layout>
  );
}

export default Home;

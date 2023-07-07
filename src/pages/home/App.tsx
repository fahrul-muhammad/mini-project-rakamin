import { TaskCard, kanbanBoardComponent as KanbanCard, LayoutComponent as Layout } from "../../components";
import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getDataTodos } from "../../axios/todos/getTodos";
import { getTaskItems } from "../../axios/items/getTasks";
import { deleteTask } from "../../axios/items/deleteItems";
import { editTask } from "../../axios/items/editTask";
import { useNavigate } from "react-router-dom";
import authContext from "../../authContext";

// const token = localStorage.getItem("token");

// fake data generator
const getItems = (count: any, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};
const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: any) => ({
  // background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  minWidth: 250,
});

function Home() {
  const { authToken } = useContext(authContext);
  const storageToken = localStorage.getItem("token") as string;
  const tokenss = JSON.parse(storageToken) || authToken;

  const navigate = useNavigate();
  const [board, setBoard] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      const temp: any = [];
      const todos = await getDataTodos(tokenss);
      if (Array.isArray(todos) && todos.length) {
        for await (const todo of todos) {
          await getTaskItems(todo.id, tokenss).then((task) => {
            temp.push({
              ...todo,
              task,
            });
          });
        }
        setBoard(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!tokenss) {
      return navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!isLoading && tokenss) {
      getData();
    }
  }, [isLoading]);

  function onDragEnd(result: any) {
    const { source, destination, draggableId } = result;
    // dropped outside the list
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
      editTask({ target_todo_id: destBoard }, sourceBoard, draggableId)
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
    editTask({ target_todo_id: destBoard }, sourceBoard, taskId)
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
    editTask({ target_todo_id: destBoard }, sourceBoard, taskId)
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
    >
      <DragDropContext
        onDragEnd={(e) => {
          onDragEnd(e);
        }}
      >
        {board.length <= 0 ? (
          <p>No Group Task</p>
        ) : (
          <div className="flex w-screen pc:flex-row laptop:flex-row tablet:flex-row mobile:flex-col">
            {/* LOOPING BOARD DATA */}
            {isLoading ? null : (
              <>
                {board.map((val: any, ind: number) => {
                  return (
                    <Droppable key={ind} droppableId={`${ind}`}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          <KanbanCard
                            ref={null}
                            colorId={ind}
                            taskLength={val.task.length}
                            todoId={val.id}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                            onPress={() => {}}
                            setLoading={(status: boolean) => {
                              setIsLoading(status);
                            }}
                            title={val?.title}
                            description={val?.description}
                          >
                            {/* LOOPING TASK IN EVERY BOARD */}
                            {val?.task?.lengt <= 0
                              ? null
                              : val?.task?.map((item: any, index: any) => (
                                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided, _) => (
                                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <TaskCard
                                          isFirstIndex={board[0] === val}
                                          isLastIndex={board[board.length - 1] === val}
                                          onDelete={async () => {
                                            setIsLoading(true);
                                            await deleteTask(item.id, val.id).then(() => {
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

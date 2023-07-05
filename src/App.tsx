import { TaskCard, kanbanBoardComponent as KanbanCard, LayoutComponent as Layout } from "./components";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getDataTodos } from "./axios/todos/getTodos";
import { getTaskItems } from "./axios/items/getTasks";
import { deleteTask } from "./axios/items/deleteItems";

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
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  minWidth: 250,
});

function App() {
  // const [board, setBoard] = useState([getItems(10), getItems(5, 10)]);
  const [board, setBoard] = useState<any>([]);

  const getData = async () => {
    try {
      const temp: any = [];
      const todos = await getDataTodos();
      if (Array.isArray(todos) && todos.length) {
        for await (const todo of todos) {
          await getTaskItems(todo.id).then((task) => {
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
    getData();
  }, []);

  function onDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(board[sInd], source.index, destination.index);
      const newState: any = [...board];
      newState[sInd] = items;
      setBoard(newState);
    } else {
      const result = move(board[sInd], board[dInd], source, destination);
      const newState = [...board];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setBoard(newState.filter((group) => group.length));
    }
  }

  console.log("BOARD : ", board);

  return (
    <Layout
      onPress={() => {
        setBoard([...board, []]);
      }}
    >
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {board.map((val: any, ind: number) => {
            return (
              <Droppable key={ind} droppableId={val.id}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <KanbanCard
                      todoId={val.id}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                      onPress={() => {
                        setBoard([...board, getItems(1)]);
                      }}
                      title={val?.title}
                      description={val?.description}
                    >
                      {val?.task?.lengt <= 0
                        ? null
                        : val?.task?.map((item: any, index: any) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <TaskCard
                                    onDelete={async () => {
                                      await deleteTask(item.id, val.id);
                                    }}
                                    taskId={item.id}
                                    name={item.name}
                                    progress={item.progress_percentage}
                                    todoId={val.id}
                                    onEdit={() => {}}
                                    onMove={() => {}}
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
        </DragDropContext>
      </div>
    </Layout>
  );
}

export default App;

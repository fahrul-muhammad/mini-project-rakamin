import "./App.css";
import { LayoutComponent, kanbanBoardComponent as KanbanBoard } from "./components";

const arrayTest = [1, 2, 3, 4];

function App() {
  return (
    <>
      <LayoutComponent>
        {arrayTest.map((val): any => {
          return (
            <>
              <KanbanBoard />
            </>
          );
        })}
      </LayoutComponent>
    </>
  );
}

export default App;

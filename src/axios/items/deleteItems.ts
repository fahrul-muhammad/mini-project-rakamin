import axios from "axios";
const token = localStorage.getItem("token");

export const deleteTask = async (taskId: number, todoId: number) => {
  try {
    const response = await axios.delete(`https://todo-api-18-140-52-65.rakamin.com/todos/${todoId}/items/${taskId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("DELETE ITEMS RES : ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

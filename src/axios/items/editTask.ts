import axios from "axios";
const token = localStorage.getItem("token");

export const editTask = async (body: any, todoId: number, taskId: number) => {
  try {
    const response = await axios.patch(`https://todo-api-18-140-52-65.rakamin.com/todos/${todoId}/items/${taskId}`, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("RESPONSE EDIT TASK : ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

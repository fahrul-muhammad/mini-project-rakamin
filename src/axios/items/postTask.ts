import axios from "axios";
const token = localStorage.getItem("token");

export const postNewTask = async (todoId: number, name: string, progress_percentage: number) => {
  try {
    const response = await axios.post(
      `https://todo-api-18-140-52-65.rakamin.com/todos/${todoId}/items`,
      {
        name,
        progress_percentage,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("RESPONSE POST TASK : ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

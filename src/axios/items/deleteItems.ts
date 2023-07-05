import axios from "axios";

export const deleteTask = async (taskId: number, todoId: number) => {
  try {
    const response = await axios.delete(`https://todo-api-18-140-52-65.rakamin.com/todos/${todoId}/items/${taskId}`, {
      headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJleHAiOjE2OTcxOTQ2NTR9.zRvVu5AlCxpInd5c-f6BDSVbRvxBztkXeynKZc_w0ZU",
      },
    });
    console.log("DELETE ITEMS RES : ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

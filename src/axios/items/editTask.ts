import axios from "axios";

export const editTask = async (body: any, todoId: number, taskId: number) => {
  try {
    const response = await axios.patch(`https://todo-api-18-140-52-65.rakamin.com/todos/${todoId}/items/${taskId}`, body, {
      headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJleHAiOjE2OTcxOTQ2NTR9.zRvVu5AlCxpInd5c-f6BDSVbRvxBztkXeynKZc_w0ZU",
      },
    });
    console.log("RESPONSE EDIT TASK : ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

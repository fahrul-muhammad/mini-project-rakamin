import axios from "axios";

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
          Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJleHAiOjE2OTcxOTQ2NTR9.zRvVu5AlCxpInd5c-f6BDSVbRvxBztkXeynKZc_w0ZU",
        },
      }
    );
    console.log("RESPONSE POST TASK : ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

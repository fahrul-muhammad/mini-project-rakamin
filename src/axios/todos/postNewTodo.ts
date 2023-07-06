import axios from "axios";

export const postNewTodos = async (body: any) => {
  try {
    const response = axios.post("https://todo-api-18-140-52-65.rakamin.com/todos", body, {
      headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJleHAiOjE2OTcxOTQ2NTR9.zRvVu5AlCxpInd5c-f6BDSVbRvxBztkXeynKZc_w0ZU",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

import axios from "axios";

export const postNewTodos = async (body: any, token: string) => {
  try {
    const response = axios.post("https://todo-api-18-140-52-65.rakamin.com/todos", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

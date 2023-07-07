import axios from "axios";
const token = localStorage.getItem("token");

export const postNewTodos = async (body: any) => {
  console.log("TOKEN POST NEW TODOS", token);
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

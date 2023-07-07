import axios from "axios";
const token = localStorage.getItem("token");

export const getDataTodos = async () => {
  try {
    const response = await axios.get("https://todo-api-18-140-52-65.rakamin.com/todos", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = [...response.data.slice(0, 3)];
    console.log("RESOPNSE GET DATA : ", response);
    // const return
    data.push(response.data[response.data.length - 1]);
    return data;
  } catch (error) {
    console.error(error);
  }
};

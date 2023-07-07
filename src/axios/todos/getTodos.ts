import axios from "axios";

// const token = localStorage.getItem("token");

export const getDataTodos = async (token: any) => {
  try {
    const response = await axios.get("https://todo-api-18-140-52-65.rakamin.com/todos", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    let data = response.data;
    if (response.data.length >= 4) {
      data = [...response.data.slice(0, 3)];
      data.push(response.data[response.data.length - 1]);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

import axios from "axios";
// const token = localStorage.getItem("token");

export const getTaskItems = async (id: number, token: string) => {
  // console.log("TOKEN API : ", token);
  try {
    const response = await axios.get(`https://todo-api-18-140-52-65.rakamin.com/todos/${id}/items`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data.slice(0, 5);
  } catch (error) {
    console.error(error);
  }
};

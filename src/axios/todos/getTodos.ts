import axios from "axios";

export const getDataTodos = async () => {
  try {
    const response = await axios.get("https://todo-api-18-140-52-65.rakamin.com/todos", {
      headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJleHAiOjE2OTcxOTQ2NTR9.zRvVu5AlCxpInd5c-f6BDSVbRvxBztkXeynKZc_w0ZU",
      },
    });
    return response.data.slice(0, 4);
  } catch (error) {
    console.error(error);
  }
};

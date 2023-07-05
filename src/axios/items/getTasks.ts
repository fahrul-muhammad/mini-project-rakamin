import axios from "axios";

export const getTaskItems = async (id: number) => {
  try {
    const response = await axios.get(`https://todo-api-18-140-52-65.rakamin.com/todos/${id}/items`, {
      headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJleHAiOjE2OTcxOTQ2NTR9.zRvVu5AlCxpInd5c-f6BDSVbRvxBztkXeynKZc_w0ZU",
      },
    });

    return response.data.slice(0, 5);
  } catch (error) {
    console.error(error);
  }
};

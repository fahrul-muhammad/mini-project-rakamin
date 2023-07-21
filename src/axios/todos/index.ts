import axios from "axios";

export default (tokens: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

  return {
    getDataTodos: async () => {
      try {
        const response = await axios.get("https://todo-api-18-140-52-65.rakamin.com/todos");
        let data = response.data;
        if (response.data.length >= 4) {
          data = [...response.data.slice(0, 3)];
          data.push(response.data[response.data.length - 1]);
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    postNewTodos: async (body: any) => {
      try {
        const response = axios.post("https://todo-api-18-140-52-65.rakamin.com/todos", body);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  };
};

import axios from "axios";

export default (tokens: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

  return {
    getTask: async (todoId: number) => {
      try {
        const response = await axios.get(`/todos/${todoId}/items`);
        return response.data.slice(0, 5);
      } catch (error) {
        console.error(error);
      }
    },
    postTask: async (todoId: number, name: string, progress_percentage: number) => {
      try {
        const response = await axios.post(`/todos/${todoId}/items`, {
          name,
          progress_percentage,
        });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    patchTask: async (body: any, todoId: number, taskId: number) => {
      try {
        const response = await axios.patch(`/todos/${todoId}/items/${taskId}`, body);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    deleteTask: async (taskId: number, todoId: number) => {
      try {
        const response = await axios.delete(`/todos/${todoId}/items/${taskId}`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  };
};

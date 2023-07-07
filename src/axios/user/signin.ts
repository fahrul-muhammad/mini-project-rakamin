import axios from "axios";

interface Props {
  email: string;
  password: string;
}

export const signIn = async (body: Props) => {
  try {
    const response = await axios.post("https://todo-api-18-140-52-65.rakamin.com/auth/login", body);
    return response;
  } catch (error: any) {
    return error;
  }
};

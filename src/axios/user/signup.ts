import axios from "axios";

interface Props {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const Register = async (body: Props) => {
  try {
    const response = await axios.post("https://todo-api-18-140-52-65.rakamin.com/signup", body);

    return response;
  } catch (error) {
    return error;
  }
};

import { useState, useContext } from "react";
import Logo from "../../assets/logo.png";
import { Register } from "../../axios/user/signup";
import authContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../../components/loading";

const SignUp = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setAuthToken, setAuthenticated } = useContext(authContext);

  const handleRegister = async () => {
    setIsLoading(true);
    setIsError(false);
    const result: any = await Register(body);
    if (result.status === 201) {
      setIsLoading(false);

      const token = JSON.stringify(result.data.auth_token);
      localStorage.setItem("token", token);
      setAuthToken(token);
      setAuthenticated(true);
      setSuccessMsg("Register Berhasil");

      setTimeout(() => {
        return navigate("/home");
      }, 1500);
    } else {
      setIsLoading(false);

      setErrorMsg("Register Error, Coba lagi");
      return setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      {isLoading && <LoadingIndicator />}
      <div className="flex items-center justify-center p-4 flex-col border-2  h-[65vh] rounded-md w-[35vw] border-gray-300 pc:w-[35vw] laptop:w-[35vw] mobile:w-[100vw] mobile:border-none tablet:w-[60vw]">
        <img src={Logo} alt="Logo" className="w-[210px] h-[100px] relative" />
        <div className="w-[90%] mb-3">
          <p>
            <span className="text-red-600">*</span> Nama
          </p>
          <input
            type="Nama"
            className="relative w-full px-3 py-3 mt-1 text-sm placeholder-gray-400 bg-white  border-[#E0E0E0] focus:border-primary border-2 rounded outline-none text-slate-800 placeholder:text-slate-600 focus:outline-none "
            placeholder="Nama"
            onChange={(e) => {
              setBody({
                ...body,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="w-[90%] mb-3">
          <p>
            <span className="text-red-600">*</span> Email
          </p>
          <input
            type="email"
            className={`relative  w-full px-3 py-3 mt-1 text-sm placeholder-gray-400 bg-white   rounded outline-none text-slate-800 placeholder:text-slate-600 focus:outline-none  border-[#E0E0E0] focus:border-primary border-2`}
            placeholder="Email"
            onChange={(e) => {
              setBody({
                ...body,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="w-[90%] mb-3">
          <p>
            <span className="text-red-600">*</span> Password
          </p>
          <input
            type="Password"
            className="relative w-full px-3 py-3 mt-1 text-sm placeholder-gray-400 bg-white   rounded outline-none text-slate-800 placeholder:text-slate-600 focus:outline-none  border-[#E0E0E0] focus:border-primary border-2"
            placeholder="Password"
            onChange={(e) => {
              setBody({
                ...body,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div className="w-[90%] ">
          <p>
            <span className="text-red-600">*</span> Confirm Password
          </p>
          <input
            type="password"
            className="relative w-full px-3 py-3 mt-1 text-sm placeholder-gray-400 bg-white   rounded outline-none text-slate-800 placeholder:text-slate-600 focus:outline-none  border-[#E0E0E0] focus:border-primary border-2"
            placeholder="Confirm Password"
            onChange={(e) => {
              setBody({
                ...body,
                password_confirmation: e.target.value,
              });
            }}
          />
        </div>
        {!isError && successMsg.length > 0 ? <p className="mt-4 text-green-600">{successMsg}</p> : null}
        {isError && <p className="mt-4 text-red-600">{errorMsg}</p>}
        <button onClick={handleRegister} className="flex mt-5 items-center justify-center w-[90%] h-[5vh] rounded-md bg-turquoise focus:bg-teal-700">
          <p className="font-semibold text-white">Daftar</p>
        </button>
        <button
          className="mt-[20px]"
          onClick={() => {
            navigate("/login");
          }}
        >
          <p>
            Sudah punya akun? <span className="text-turquoise">Masuk disini</span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default SignUp;

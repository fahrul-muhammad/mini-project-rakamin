import { useState, useEffect, useContext } from "react";
import Logo from "../../assets/logo.png";
import { signIn } from "../../axios/user/signin";
import authContext from "../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingIndicator from "../../components/loading";

const Login = () => {
  const { setAuthenticated, setAuthToken, authenticated } = useContext(authContext);
  const location = useLocation();
  const [body, setBody] = useState({
    email: location.state !== null ? location.state.email : "",
    password: location.state !== null ? location.state.password : "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      setTimeout(() => {
        return navigate("/home");
      }, 1500);
    }
  }, [authenticated]);

  const handleLogin = async () => {
    setIsLoading(true);
    setIsError(false);
    const result = await signIn(body);
    if (result.status === 200) {
      setIsLoading(false);
      const token = JSON.stringify(result.data.auth_token);
      setSuccessMsg("Berhasil Login");
      localStorage.setItem("token", token);
      setAuthToken(token);
      setAuthenticated(true);
    } else {
      setIsLoading(false);
      setErrorMsg("Email atau password salah");
      return setIsError(true);
    }
  };

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex items-center justify-center p-4 flex-col border-2  h-[55vh] rounded-md pc:w-[35vw] laptop:w-[35vw] mobile:w-[100vw] mobile:border-none tablet:w-[60vw] border-gray-300">
          <img src={Logo} alt="Logo" className="w-[210px] h-[100px] relative" />
          <div className="w-[90%] mb-3">
            <p>
              <span className="text-red-600">*</span> Email
            </p>
            <input
              type="email"
              className="relative w-full px-3 py-3 mt-1 text-sm placeholder-gray-400 bg-white border-2 border-[#E0E0E0] rounded outline-none text-slate-800 placeholder:text-slate-600 focus:outline-none focus:border-primary"
              placeholder="Email"
              onChange={(e) =>
                setBody({
                  ...body,
                  email: e.target.value,
                })
              }
              value={body.email}
            />
          </div>
          <div className="w-[90%] ">
            <p>
              <span className="text-red-600">*</span> Password
            </p>
            <input
              type="password"
              className="relative w-full border-2 px-3 py-3 mt-1 text-sm placeholder-gray-400 bg-white border-[#E0E0E0] rounded outline-none text-slate-800 placeholder:text-slate-600 focus:outline-none focus:border-primary"
              placeholder="Password"
              onChange={(e) =>
                setBody({
                  ...body,
                  password: e.target.value,
                })
              }
              value={body.password}
            />
          </div>
          {isError && <p className="mt-4 text-red-600">{errorMsg}</p>}
          {!isError && successMsg.length > 0 ? <p className="mt-4 text-green-600">{successMsg}</p> : null}
          <button onClick={handleLogin} className="mt-4 flex items-center justify-center w-[90%] h-[5vh] rounded-md bg-turquoise focus:bg-teal-700">
            <p className="font-semibold text-white">Masuk</p>
          </button>
          <button
            className="mt-[20px]"
            onClick={() => {
              navigate("/register");
            }}
          >
            <p>
              Belum punya akun? <span className="text-turquoise">Daftar Disini</span>
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

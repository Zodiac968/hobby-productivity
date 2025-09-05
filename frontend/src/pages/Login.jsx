import axiosInstance from "../axios.js";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/account/login", {
        email,
        password,
      });
      login(response.data.user, response.data.token); //Stores it in context and localStorage
      navigate("/dashboard");
    } catch (e) {
      setErr(e.response?.data?.error || "Login Failed");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow flex flex-col p-10 pb-5 rounded w-100">
          <h2 className="text-2xl font-medium text-center m-2">Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium m-1" htmlFor="email">
                Email
              </label>
              <input
                className="block border border-gray-300 shadow rounded w-5/6 h-10 p-3 m-2"
                type="email"
                id="email"
                placeholder="Enter you email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErr(null);
                }}
                required
              />
            </div>
            <div>
              <label className="block font-medium m-1" htmlFor="password">
                Password
              </label>
              <input
                className="block border border-gray-300 shadow rounded w-5/6 h-10 p-3 m-2"
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErr(null);
                }}
                required
              ></input>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 w-full h-10 text-white rounded-md my-2"
              type="submit"
            >
              Login
            </button>
            <div>
              <p className="text-sm text-center m-1">
                Dont have an account?{" "}
                <Link className="text-blue-500 hover:underline" to="/register">
                  Register
                </Link>
              </p>
            </div>
          </form>
          {err && <p className="text-center text-red-500 mt-3">{err}</p>}
        </div>
      </div>
    </>
  );
}

export default Login;

import axiosInstance from "../axios.js";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/account/login", {
        email,
        password,
      });
      login(response.data.user, response.data.token); //Stores it in context and localStorage
      setErr("Login Sucessful");
    } catch (e) {
      setErr(e.response?.data?.error || "Login Failed");
    }
  };
  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <button type="submit">Login</button>
          <div>
            <p>
              Dont have an account? <a href="#">Register</a>
            </p>
          </div>
        </form>
        {err && <p>{err}</p>}
      </div>
    </>
  );
}

export default LoginPage;

import axiosInstance from "../axios.js";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/account/register", {
        name,
        email,
        password,
      });
      setErr("Registered Successfully");
    } catch (e) {
      setErr(e.response?.data?.error || "Registration Failed");
    }
  };
  return (
    <>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <button type="submit">Register</button>
          <div>
            <p>
              Go to <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
        {err && <p>{err}</p>}
      </div>
    </>
  );
}

export default Register;

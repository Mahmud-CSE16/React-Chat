import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import "../style.scss";
function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">React Chat</span>
        <span className="title">Login</span>

        <form onSubmit={handleSubmit} action="">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Login</button>
          {err && (
            <span style={{ backgroundColor: "red" }}>Something went wrong</span>
          )}
        </form>
        <p>
          You do have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

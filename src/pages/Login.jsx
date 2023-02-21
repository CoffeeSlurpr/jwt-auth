import { Button, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { user, authenticated } = useUser();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const response = await axios.post(
      "http://localhost:3000/login",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    navigate("/");
  };

  useEffect(() => {
    if (user || authenticated) {
      navigate("/");
    }
  }, [user, authenticated]);

  const handleLogout = async () => {
    const response = await axios.get("http://localhost:3000/logout", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/login");
  };

  return (
    <div className="login">
      <TextField
        label="Username"
        variant="outlined"
        inputRef={usernameRef}
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        inputRef={passwordRef}
      />

      <Button
        variant="outlined"
        onClick={handleSubmit}
      >
        Log In
      </Button>

      <Button
        variant="outlined"
        onClick={handleLogout}
      >
        Delete Cookie
      </Button>
    </div>
  );
};

export default Login;

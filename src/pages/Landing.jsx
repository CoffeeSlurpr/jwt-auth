import { Button } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Landing = () => {
  const { user, authenticated } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axios.get("http://localhost:3000/logout", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/login");
  };

  useEffect(() => {
    if (user && authenticated) {
      navigate("/");
    }
  }, [user, authenticated]);

  return (
    <div className="landing">
      <div style={{ margin: "10px" }}>You are logged in</div>
      <Button
        onClick={handleLogout}
        variant="outlined"
      >
        Log Out
      </Button>
    </div>
  );
};

export default Landing;

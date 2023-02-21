import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export const useUser = () => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const getAuthenticatedUser = async (cookies) => {
    const defaultReturnObject = { authenticated: false, user: null };

    try {
      const token = cookies?.token;

      if (!token) {
        return defaultReturnObject;
      }

      const response = await axios.get("http://localhost:3000/verify", {
        withCredentials: true,
      });

      const { authenticated = false } = response.data;

      return authenticated ? response.data : false;
    } catch (error) {
      console.log("getAuthenticatedUser, Something Went Wrong", error);
      return defaultReturnObject;
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const { authenticated, user } = await getAuthenticatedUser(cookies);

      if (!authenticated) {
        navigate("/login");
        return;
      }

      setUser(user);
      setIsAuthenticated(authenticated);
    };

    getUserDetails();
  }, []);

  console.log("User hook ran");
  return { user, isAuthenticated };
};

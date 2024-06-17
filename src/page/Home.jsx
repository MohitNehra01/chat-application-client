import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AccountProvider";
import { useNavigate } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";

function Home() {
  const { account, setAuthenticated, setAccount } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_token") !== null) {
      setAuthenticated(true);
      setAccount(JSON.parse(localStorage.getItem("Login_user")));
    } else {
      setAccount("");
      setAuthenticated(false);
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  return <div>{account ?(
    <div>
       <HomePage />
      </div>
  ) : ""}</div>;
}

export default Home;

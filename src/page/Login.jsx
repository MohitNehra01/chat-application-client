import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AccountProvider";

function Login() {
  const navigate = useNavigate();
  const { setAccount, setAuthenticated } =
    useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('auth_token') !== null) {
      window.location.reload()
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;


    setLoginCredentials({
      ...loginCredentials,
      [name]: value,
    });
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    if (!loginCredentials.email || !loginCredentials.password) {
      toast.error("Please fill  all details");
      return;
    }

    // email validation

    if (
      !loginCredentials.email
        .toLocaleLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      toast.error("Invalid Email Adress");
      return;
    }

    try {
      let toastloading = toast.loading("Wait, Login....");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginCredentials),
        }
      );

      const json = await response.json();
     

      if (!json.success) {
        toast.error(json.msg, {
          id: toastloading,
        });
        return;
      }

      toast.success(json.msg, {
        id: toastloading,
      });

      localStorage.setItem("auth_token", json.auth_token);
      localStorage.setItem("Login_user", JSON.stringify(json.user));

      setAccount(json.user);
      setAuthenticated(true);
      navigate("/");

    } catch (error) {
      toast.dismiss();
      return toast.error("network error");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-800 h-[100vh]">
      <form
        action=""
        className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        noValidate
        onSubmit={loginSubmitHandler}
        encType="multipart/form-data"
      >
        <h1 className="text-center text-2xl font-bold">Login Back</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            required
            name="email"
            id="email"
            placeholder="Enter your email"
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            required
            name="password"
            id="password"
            placeholder="Enter your password"
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
          />
        </div>

        <button
          className="mt-2 bg-yellow-600  py-2 hover:bg-yellow-500 hover:rounded-sm transition-all ease-in-out duration-300"
          type="submit"
        >
          Login
        </button>

        <p>
          New account ?{" "}
          <Link
            to="/signup"
            className="underline text-green-600 cursor-pointer"
          >
            signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

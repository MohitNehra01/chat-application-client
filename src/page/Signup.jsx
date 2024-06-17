import React, { useState, useEffect, useContext } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { register } from "../api/user.api";
import { AuthContext } from "../context/AccountProvider";

function Signup() {
  const { setAccount, setAuthenticated } = useContext(AuthContext);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  const [signupCredentials, setSignupCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setSignupCredentials({
      ...signupCredentials,
      [name]: value,
    });
  };

  const getImage = (event) => {
    event.preventDefault();

    // geeting image
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupCredentials({
        ...signupCredentials,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  };

  const createNewAccount = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (
      !signupCredentials.name ||
      !signupCredentials.email ||
      !signupCredentials.confirmPassword ||
      !signupCredentials.password
    ) {
      toast.error("Please fill  all details");
      return;
    }

    // checking name field length

    if (signupCredentials.name.length < 4) {
      toast.error("Name should be atleast of 4 characters");
      return;
    }

    // email validation

    if (
      !signupCredentials.email
        .toLocaleLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      toast.error("Invalid Email Adress");
      return;
    }

    // validate a password

    if (
      !signupCredentials.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/
      )
    ) {
      toast.error(
        "password must be atleast one lowerCase, one uppercase , special character, one numeric and minimum 8 characterś long"
      );
      return;
    }

    // confirm password

    if (signupCredentials.password !== signupCredentials.confirmPassword) {
      toast.error("Password and confirm Password must be same");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", signupCredentials.avatar);
    formData.append("name", signupCredentials.name);
    formData.append("email", signupCredentials.email);
    formData.append("password", signupCredentials.password);
    formData.append("confirmPassword", signupCredentials.confirmPassword);
    

    try {
      let toastloading = toast.loading("Creating new account");
      // const response = await fetch('https://chat-api-zrff.onrender.com/api/auth/register', {
      //     method: 'POST',
      //     body: formData
      //   })
      const response = await register(formData);

      const json = await response.json();
      console.log(json);
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
  useEffect(() => {
    if (localStorage.getItem("auth_token") !== null) {
      window.location.reload();
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex items-center justify-center bg-gray-800 h-[100vh]">
      <form
        action=""
        className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        noValidate
        onSubmit={createNewAccount}
        encType="multipart/form-data"
      >
        <h1 className="text-center text-2xl font-bold">Registration Page</h1>

        <label htmlFor="image_uploads" className="cursor-pointer">
          {previewImage ? (
            <img
              className="w-24 h-24 rounded-full m-auto"
              src={previewImage}
              alt="upload img"
            />
          ) : (
            <BsPersonCircle className="w-24 h-24 rounded-full m-auto " />
          )}
        </label>

        <input
          className="hidden"
          type="file"
          id="image_uploads"
          accept=".jpg , .jpeg,.png , .svg"
          onChange={getImage}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            required
            name="name"
            id="name"
            placeholder="Enter your name"
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
          />
        </div>
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
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            required
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Re enter your password"
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
          />
        </div>

        <button
          className="mt-2 bg-yellow-600  py-2 hover:bg-yellow-500 hover:rounded-sm transition-all ease-in-out duration-300"
          type="submit"
        >
          Create account
        </button>

        <p>
          Already have an account ?{" "}
          <Link to="/login" className="underline text-green-600 cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;

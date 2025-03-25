import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleImg from "../assets/google.svg";
import AppleImg from "../assets/apple.svg"; // Add Apple logo
import { LogoImg } from "../components/logo";
import { Check, Warning } from "@phosphor-icons/react";
import { auth, googleProvider, appleProvider } from "../firebase"; // Ensure this path is correct
import { signInWithPopup } from "firebase/auth";

export { GoogleImg, AppleImg };

export const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost/maggiebeautyhome-backend/signup.php", {
        name,
        email,
        password,
      })
      .then((response) => {
        if (response.data.success) {
          navigate("/");
          return (
            <div className="w-full h-screen bg-black/60 flex items-center justify-center z-40 fixed top-0 ">
              <div className="bg-white rounded-md flex items-center gap-4 px-5 py-3 text-green-500">
                <Check size={19} /> Successfully signed up
              </div>
            </div>
          );
        } else {
          return (
            <div className="w-full h-screen bg-black/60 flex items-center justify-center z-40 fixed top-0 ">
              <div className="bg-white rounded-md flex items-center gap-4 px-5 py-3 text-green-500">
                <Warning size={19} /> Registration failed! please try again
              </div>
            </div>
          );
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // You can send user information to your backend if needed
      console.log("Google sign-in successful:", user);
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      return (
        <div className="w-full h-screen bg-black/60 flex items-center justify-center z-40 fixed top-0 ">
          <div className="bg-white rounded-md flex items-center gap-4 px-5 py-3 text-green-500">
            <Warning size={19} /> Registration failed! please try again
          </div>
        </div>
      );
    }
  };

  const signInWithApple = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const user = result.user;
      // You can send user information to your backend if needed
      console.log("Apple sign-in successful:", user);
      navigate("/");
    } catch (error) {
      console.error("Apple sign-in error:", error);
      return (
        <div className="w-full h-screen bg-black/60 flex items-center justify-center z-40 fixed top-0 ">
          <div className="bg-white rounded-md flex items-center gap-4 px-5 py-3 text-green-500">
            <Warning size={19} /> Registration failed! please try again
          </div>
        </div>
      );
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the last visited page
  };

  return (
    <main className="w-full min-h-screen relative flex items-center justify-center bg-gray-200/30">
      <section className="max-w-[350px] w-full bg-white space-y-6 py-8 rounded-2xl shadow px-5">
        <button onClick={handleBack} className="text-sm text-primary inter-600">
          &larr; Back
        </button>
        <div className="w-full flex items-center justify-center">
          <img src={LogoImg} alt="" className="w-16" />
        </div>
        <h1 className="text-center inter-600 text-gray-700">
          Create an account
        </h1>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="form-group space-y-1">
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              type="text"
              placeholder="John doe"
              value={name}
              className="w-full px-3 py-2 text-sm rounded-md shadow border border-gray-200/50"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group space-y-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              placeholder="Youremail@gmail.com"
              value={email}
              className="w-full px-3 py-2 text-sm rounded-md shadow border border-gray-200/50"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group space-y-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder=".........."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md shadow border border-gray-200/50"
            />
          </div>
          <div className="flex py-2 pl-2 items-center text-sm text-gray-500 gap-3">
            <input
              type="checkbox"
              className=" border outline-gray-400 ring-gray-400 accent-primary shadow border-gray-300"
            />
            I accept
            <span className="text-gray-700 underline underline-offset-4 inter-500">
              terms & conditions
            </span>
          </div>

          <button
            type="submit"
            className="text-white w-full smooth hover:bg-gradient-to-b rounded-md py-2 bg-gradient-to-t from-primary/80 to-primary text-sm"
          >
            Create an account
          </button>
          <div className="flex w-full gap-3 items-center">
            <div className="w-full bg-gray-300 h-[0.3px]"></div>
            <p className="text-xs text-gray-500">OR</p>
            <div className="w-full bg-gray-300 h-[0.3px]"></div>
          </div>
          <button
            type="button"
            className="w-full rounded-md flex items-center justify-center bg-gray-200/50 border border-gray-300 py-2 "
            onClick={signInWithGoogle}
          >
            <img src={GoogleImg} className="w-4" alt="" />
          </button>
          <button
            type="button"
            className="w-full rounded-md flex items-center justify-center bg-gray-200/50 border border-gray-300 py-2 "
            onClick={signInWithApple}
          >
            <img src={AppleImg} className="w-4" alt="" />
          </button>
          <div className="w-full py-2 flex items-center justify-center gap-2">
            <p className="text-gray-500 text-sm">Have an account?</p>
            <Link
              to={"/welcome-back"}
              className="text-sm text-primary inter-600"
            >
              Log in
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";
import Image from "next/image";
import { GoogleIcon } from "../assets/images";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const phrases = [
  "Dive into EUR/USD right now and soar!",
  "Get ahead with BTC/USD in the next seconds and be a winner!",
  "Maximize profits with GBP/JPY before the day ends and reach for the stars!",
  "Seize the moment with AUD/NZD while the market is hot and achieve unprecedented gains!",
  "Unlock opportunities with USD/CAD in this golden minute and be a market leader!",
  "Embark on a journey with ETH/USD in the next trading session and step into the limelight!",
  "Experience the thrill with BCH/USD before the next big surge and ride the wave of success!",
  "Capitalize on LTC/USD while opportunities abound and witness the surge!",
  "Ignite your portfolio with XRP/USD as the market unfolds for a prosperous future!",
  "Revolutionize your trades with ADA/USD and be a part of the revolution!",
  "Dive into DOT/USD right now and soar!",
  "Get ahead with LINK/USD in the next seconds and be a winner!",
  "Maximize profits with BNB/USD before the day ends and reach for the stars!",
  // Add more phrases here...
];

function generateRandomPhrase() {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

const LoginPage: NextPage = () => {
  const randomPhrase = generateRandomPhrase();

  const router = useRouter();
  const { login } = useAuthContext();
  const loginWithGoogle = async () => {
    try {
      await login();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onLoginWithEmailAndPass = async () => {
    const emailRefValue = emailRef.current?.value;
    const passRefValue = passRef.current?.value;

    debugger
  
    if (emailRefValue && passRefValue) {
      try {
        await signInWithEmailAndPassword(auth, emailRefValue, passRefValue);
      } catch (error) {
        console.error("Login failed:", error);
  
        try {
          await createUserWithEmailAndPassword(auth, emailRefValue, passRefValue);
        } catch (createError) {
          console.error("Sign up failed:", createError);
        }
      }
    } else {
      console.error("Email or password ref is null or undefined");
    }
  };

  const emailRef = useRef<HTMLInputElement | null>(null)
  const passRef = useRef<HTMLInputElement | null>(null)
  return (
    <div className="flex relative h-screen bg-[#011027]">
      <div
        className="w-9/12 absolute inset-0 bg-center bg-no-repeat bg-cover filter blur-sm"
        style={{
          backgroundImage:
            "url('https://mg.co.za/wp-content/uploads/2023/01/f53b607f-forex.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="w-9/12 relative">
        <div className="flex items-center pl-7 h-screen">
          <p className="text-xl text-white text-center z-10 font-bold">
            {randomPhrase}
          </p>
        </div>
      </div>

      <div className="w-3/12">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl mb-3 font-bold text-white">
            <span className="text-blue-500">WAHOO</span>PREDICT
          </h1>
          <p className="text-lg text-white mb-4 ">Get started</p>
          <div>
            <button
              onClick={loginWithGoogle}
              className="border rounded-2xl border-white text-white px-8 py-3 mt-4 flex items-center bg-custom-button transition-colors hover:bg-blue-700"
            >
              <Image className="w-8 pr-2" src={GoogleIcon} alt="Google Logo" />
              Login with google
            </button>
          </div>
          <div className="w-full max-w-xs mt-6">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Email"
                  ref={emailRef}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  ref={passRef}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={onLoginWithEmailAndPass}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2020 Acme Corp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

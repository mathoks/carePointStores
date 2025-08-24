"use client";
import { Authenticate } from "@/app/actions/users/Authenticate";
import { validate } from "@/app/utills/validator";
import { signIn } from "next-auth/react";
import Form from "next/form";
import Link from "next/link";
import React from "react";
import { useActionState } from "react";
import googlePic from "../../../public/icons8-google.svg"
import Image from "next/image";
import {useRouter} from "next/navigation"
import Cookies from "js-cookie";
import { GetCartFromLocal } from "@/app/utills/utills";

const LoginCheckMail = ({ html }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

const LoginForm = () => {
  const initialState = { message: null, errors: {} };
  const initialState2 = { message: null, errors: {} };
  const [state, dispatch] = useActionState(Authenticate, initialState);
  const [states, dispatch2] = useActionState(validate, initialState2);
const router = useRouter()
  if(Array.isArray(state?.errors.error) && state?.errors?.error[0] === "NEXT_REDIRECT"){
    router.push('/register')
  }
 

  return (
    <div className="">
      <Form action={dispatch} className="grid  gap-4 grid-cols-1 ">
        <label className="input input-bordered  border-schemes-light-outline flex items-center gap-2 bg-white focus:border-orange-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow "
            placeholder="Email"
            name="email"
            onBlur={dispatch2}
          />
        </label>
        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            className="btn bg-schemes-light-primary text-schemes-light-onPrimary border-none"
            name="Email"
          >
            SIGNIN
          </button>
          <Link href="/register" className="hover:link  text-sm">
            Don&apos;t have an account? Sign Up
          </Link>{" "}
        </div>
      </Form>
      <div className="divider text-schemes-light-onSurfaceVariant">OR</div>
      <button
        onClick={ async ()=> {
          GetCartFromLocal() 
          try {
             await signIn("google");
             localStorage.removeItem("cart");
            }
             catch (error) {
            console.error("Google sign-in failed:", error);
          }
            }}
        className="btn bg-schemes-light-primaryContainer text-schemes-light-onPrimaryContainer  border-schemes-light-outline  shadow-none  flex gap-2 items-center w-full"
      >
        <Image src={googlePic} alt="pic" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default LoginForm;

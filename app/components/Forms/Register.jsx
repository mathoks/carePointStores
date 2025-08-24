"use client";
import React from "react";
import Form from "next/form";
import Link from "next/link";
import { Authenticate } from "@/app/actions/users/Authenticate";
import { useActionState } from "react";
import { addUser } from "@/app/actions/users/addUsers";
import { validate } from "@/app/utills/validator";
import { signIn } from "next-auth/react";

const Register = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(addUser, initialState);
  const [states, dispatch2] = useActionState(validate, {});

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
            type="text"
            className="grow-0 "
            placeholder="Email"
            name="email"
            onBlur={dispatch2}
          />
        </label>
        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            className="btn bg-schemes-light-primary text-schemes-light-onPrimary border-none"
          >
            SIGNUP
          </button>
          <span className="text-sm text-schemes-light-onSurfaceVariant">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className=" link no-underline text-schemes-light-surfaceTint"
            >
              Log in
            </Link>
          </span>
        </div>
      </Form>
      <div className="divider text-schemes-light-onSurfaceVariant">OR</div>
      <button
        onClick={() => {
          signIn("google");
        }}
        className="btn bg-schemes-light-primaryContainer text-schemes-light-onPrimaryContainer  border-schemes-light-outline  shadow-none  flex gap-2 items-center w-full"
      >
        <img src="https://www.flaticon.com/free-icons/google" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default Register;

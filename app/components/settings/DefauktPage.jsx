import Link from "next/link";
import React, { memo } from "react";
import CountrySelected from "./CountrySelected";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { userPrefOptions } from "@/app/lib/queryClient/preferenceQuery";

const Settings = memo(function Default({ handler2 }) {
  const session = useSession();
  const {data, isSuccess} = useQuery(userPrefOptions(session?.data?.user?.id))
  if (!session) {
    redirect("/login");
  }
  console.log(data)
  return (
    <div className="grid grid-flow-row gap-4 pt-0">
      <div className="p-4 space-y-4  bg-white  ">
        <Link className="link no-underline pb-2" href={"settings/profile"}>
          Profile
        </Link>
        <br />
        <p className=""></p>
        <Link
          className="link pt-4 no-underline"
          href={"settings/shipping-address"}
        >
          Shipping address
        </Link>
      </div>
      <div className="px-4 bg-white space-y-4 py-4">
        <div className="flex justify-between">
          <p onClick={handler2}>Ship to</p>
          <CountrySelected />
        </div>
        <div className="flex justify-between">
          <p>Currency</p>
          <span className="">NGN</span>
        </div>
        <div className="flex justify-between">
          <p>Language</p>
          <span className="">English</span>
        </div>
      </div>

      <div className="p-4 space-y-4  bg-white ">
        <div className="flex flex-col gap-2">
          <Link href={"settings/preferences"} className="pb-2">
            Product preference
          </Link>

          <Link href={"history"} className="link no-underline">
            Viewed
          </Link>
        </div>

        <p>Clear cache</p>
        <p>Our site cookies</p>
      </div>
      <div className=" bg-white p-4">
        <button
          onClick={signOut}
          className="btn  text-schemes-light-onPrimary bg-schemes-light-primary w-full"
        >
          {" "}
          SIGN OUT
        </button>
      </div>
    </div>
  );
});

export default Settings;

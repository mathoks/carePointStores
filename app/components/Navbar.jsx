import Link from "next/link";
import CartNav from "./Cart/CartNav";
import Notification from "./Cart/Notification";
import Searchbox from "./Searchbox";
import Tabs from "./Tabs";
import { auth, signOut } from "@/auth";
import { LogOutButton } from "./bottons/LogOutButton";
import { memo } from "react";
import { LoggInIndicator } from "./bottons/LoggInIndicator";

export default  function Navbar({ user }){
  return (
    <div
      id={"navbar"}
      className="bg-schemes-light-primary    text-schemes-light-onPrimary  will-change-auto z-50 fixed w-screen"
    >
      <div className="grid grid-flow-row auto-cols-auto will-change-auto">
        <div className="navbar  items-start ">
          <div className="navbar-start md:w-[50%] w-[20%]">
            <div className="dropdown md:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#ebddff"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-schemes-light-primaryContainer text-schemes-light-onPrimaryContainer  rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a href="#">Homepage</a>
                </li>
                <li>
                  <Link href={!user?.user?.id ? "/login" : "/settings"}>
                    Settings
                  </Link>
                </li>
                <li>
                  <a>About</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center md:navbar-start ">
            <a className="btn btn-ghost text-xl">CarePointStores</a>
            {/* <Searchbox/> */}
          </div>
          {/* <div className="bg-white">
    <SearchIcon/>
  </div> */}
          <div className="navbar-end">
            <div className="form-control hidden md:block lg:block">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto bg-schemes-light-background text-schemes-light-onBackground  "
              />
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <Notification id={user?.user?.id ?? "guest"} />
                </div>
              </div>
              <CartNav user={user?.user?.id} />
            </div>
            <LoggInIndicator user={user}/>
          </div>
        </div>
        <div className="px-4">
          <Searchbox />
        </div>
      </div>
      <Tabs />
    </div>
  );
};

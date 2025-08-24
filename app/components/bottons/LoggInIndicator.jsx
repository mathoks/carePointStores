import React, { memo } from 'react'
import { LogOutButton } from './LogOutButton';
import Link from 'next/link';

export const LoggInIndicator = async ({user})=>{
  return (
     <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.user?.image ??
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    className=" object-contain"
                  />
                </div>
              </div>
              {user?.user?.id ? (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-schemes-light-primaryContainer text-schemes-light-onPrimaryContainer   rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <Link href={!user?.user?.id ? "/login" : "/settings"}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <LogOutButton />
                  </li>
                </ul>
              ) : (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-schemes-light-primaryContainer text-schemes-light-onPrimaryContainer   rounded-box z-[1] mt-3 w-32  p-2 shadow"
                >
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                </ul>
              )}
            </div>
  )
}

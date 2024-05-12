"use client";

import { auth, signOut } from "@/auth";
import Link from "next/link";

export default function Navbar() {
    const session = false; // await auth();

    const handleClick = () => {
        // signOut();
    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
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
                            stroke="currentColor"
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
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <p className="text-xl font-bold">Castle Age</p>
            </div>
            <div className="navbar-end">
                {session && (
                    <button
                        onClick={handleClick}
                        className="btn btn-primary btn-lg"
                    >
                        Sign out
                    </button>
                )}
            </div>
        </div>
    );
}

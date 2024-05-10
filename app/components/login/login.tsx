"use client";
import { useFormState } from "react-dom";
import { authenticate, signInAction } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import { useGameStore } from "@/app/store/gameStoreProvider";

export default function LoginForm() {
    const { token, setToken } = useGameStore((state) => state);
    // const [authResult, dispatch] = useFormState(authenticate, {});
    const [authResult, dispatch] = useFormState(signInAction, {});

    // useEffect(() => {
    //     if (authResult && authResult.access_token) {
    //         setToken(authResult.access_token);
    //     }
    // }, [authResult]);

    if (token) {
        return null;
    }

    return (
        <div className="hero h-full bg-base-100">
            <form action={dispatch}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Login to your account so you can play a match.
                        </p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="username"
                                    className="input input-bordered"
                                    name="username"
                                    id="username"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    id="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <a
                                        href="#"
                                        className="label-text-alt link link-hover"
                                    >
                                        Don't have an account?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                            {/* <div
                                className="flex h-8 items-end space-x-1"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {errorMessage && (
                                    <>
                                        <p className="text-sm text-red-500">
                                            {errorMessage}
                                        </p>
                                    </>
                                )}
                            </div> */}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

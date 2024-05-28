"use client";

import { FormEvent } from "react";
import { login } from "@/app/lib/actions";
import { createClient } from "@/utils/supabase/client";
import { useGameStore } from "@/app/store/gameStoreProvider";

export default function LoginForm() {
  const { setToken, setUser, setPlayer } = useGameStore((state) => state);

  const supabase = createClient();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const isSuccess = await login(formData);

    if (!isSuccess) {
      return;
    }

    const sessionData = await supabase.auth.getSession();
    const userData = await supabase.auth.getUser();

    if (userData.data.user) {
      setUser(userData.data.user);
      setToken(sessionData.data.session?.access_token ?? "");

      const playerInfo = {
        playerId: userData.data.user.id,
        name: userData.data.user.user_metadata.name,
      };

      setPlayer(playerInfo);
    }
  }

  return (
    <div className="hero h-full bg-base-100">
      <form onSubmit={handleSubmit}>
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
                  <span className="label-text">email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  id="email"
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
                  <a href="#" className="label-text-alt link link-hover">
                    Don&apos;t have an account?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";

import Cookies from "js-cookie";
import api from "@/src/services/api";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await api.post(
        "/admin/login",
        {
          email,
          password,
        }
      );

      console.log(res.data);

      // SAVE TOKEN
      Cookies.set(
        "token",
        res.data.access_token,
        {
          expires: 7,
        }
      );

      // REDIRECT
      window.location.href =
        "/dashboard";
    } catch (err) {
      console.log(err);

      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="w-[400px] bg-white p-6 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-xl"
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>

      </div>

    </div>
  );
}
"use client";

import api from "@/src/services/api";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post(
        "/admin/login",
        {
          email,
          password,
        },
      );

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.access_token,
      );

      window.location.href =
        "/dashboard";
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="w-[400px] bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-5">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}
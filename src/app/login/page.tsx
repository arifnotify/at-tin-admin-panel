"use client";

import api from "@/src/services/api";
import { useState } from "react";

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

      const response =
        await api.post(
          "/admin/login",
          {
            email,
            password,
          }
        );

      console.log(response.data);

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login Success");

      // REDIRECT
      window.location.href =
        "/dashboard";
    } catch (error: any) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Admin Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>
      </div>
    </div>
  );
}
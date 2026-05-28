"use client";

import api from "@/src/services/api";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("api/admin/login", {
        email,
        password,
      });

      console.log(res.data);

      alert("Login Success");
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[400px] p-6 bg-white shadow rounded-xl">
        <h1 className="text-2xl font-bold mb-4">
          Admin Login
        </h1>

        <input
          className="w-full p-2 border mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-3"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
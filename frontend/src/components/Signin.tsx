import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res=await axios({
        method:"POST",
        url:"http://localhost:3000/api/v1/auth/signin",
        data:{
          "email":formData.email,
          "password":formData.password
        },
        withCredentials:true
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Sign In
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg border border-black focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg border border-black focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;

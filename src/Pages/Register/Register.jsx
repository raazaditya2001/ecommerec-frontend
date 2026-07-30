import { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const Register = () => {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [form , setForm] = useState({
        name : "",
        email : "",
        password : "",
    })

    const handleChange = (e) =>{
        const {name , value} = e.target;

        setForm((prev) => (
            {
                ...prev,
                [name] : value,
            }
        ))
    }

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("/api/auth/register", {
        name:form.name,
        email: form.email,
        password : form.password,
    });

    if (res.status === 201) {
      alert("Form Submitted Successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        
      });

    login(res.data);
      
      navigate("/");
    }
  } catch (error) {
 
      alert("Server is not responding. Please try again later.");
      console.log(error.message);
  }
};
  
  return (
  <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-8">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="text-gray-400 mt-2">
          Join NexCart and start shopping today.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-gray-300 mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600
          text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Create Account
        </button>

      </form>

      {/* Login Link */}
      <div className="text-center mt-6">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

    </div>
  </div>
);
};

export default Register;

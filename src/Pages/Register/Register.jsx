import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import notify from "../../utils/toast";
// validation imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../../validations/auth.schema";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  //initiate form

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/auth/register", data);

      if (res.status === 201) {
        notify.success("Registration Successfully Done!");

        reset();

        login(res.data);

        navigate("/");
      }
    } catch (error) {
      notify.error("Server is not responding. Please try again later.");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>

          <p className="text-gray-400 mt-2">
            Join NexCart and start shopping today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name")}                 //form vaildation method
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          {errors.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
          )}

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-2">Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}                  //form vaildation method
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          {errors.email && (
            <p className="text-res-500 text-sm mt-1">{errors.email.message}</p>
          )}

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-2">Password</label>

            <input
              type="password"
              placeholder="Create a password"
              {...register("password")}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600
          text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

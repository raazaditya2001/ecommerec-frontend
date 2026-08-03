import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import notify from "../../../utils/toast";
import api from "../../../Components/api";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(user);

   const fetchUsers = async () => {
    try {
      const res = await api.get("/api/auth/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.data.length > 1) {
        setUsers(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.error(error);
      notify.error("Failed to fetch users");
      navigate("/500");
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchUsers();
    }
  }, []);

 

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Users</h1>
          <p className="text-zinc-400 mt-1">Manage registered users</p>
        </div>

        <Link
          to="/admin/dashboard"
          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-5 py-2 rounded-lg text-white"
        >
          Back
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr className="text-left text-sm uppercase text-zinc-300">
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Verified</th>
              <th className="px-6 py-4">User ID</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-t border-zinc-800 hover:bg-zinc-800/40"
              >
                <td className="px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4 font-medium text-white">
                  {user.name}
                </td>

                <td className="px-6 py-4 text-zinc-300">{user.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.verified
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.verified ? "Verified" : "Not Verified"}
                  </span>
                </td>

                <td className="px-6 py-4 text-zinc-500 text-sm">{user._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
          >
            <div className="space-y-2">
              <div>
                <p className="text-zinc-500 text-sm">Name</p>
                <p className="text-white font-medium">{user.name}</p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">Email</p>
                <p className="text-zinc-300 break-all">{user.email}</p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">Verified</p>

                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-sm ${
                    user.verified
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {user.verified ? "Verified" : "Not Verified"}
                </span>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">User ID</p>
                <p className="text-zinc-400 text-sm break-all">{user._id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;

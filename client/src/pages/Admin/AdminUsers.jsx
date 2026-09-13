import { useState, useEffect } from "react";
import { FaUserShield, FaUser, FaSyncAlt } from "react-icons/fa";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";
import { toast } from "react-toastify";

function AdminUsers() {
  const { token, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/admin/users`, { headers });
      const data = await res.json();
      if (data.success && data.users) {
        setUsers(data.users);
        if (isManual) toast.success("Users list refreshed!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message || `User role updated to ${newRole}`);
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch (err) {
      toast.error("Error updating user role");
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Users & Permissions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Registered customer accounts, administrators, and role management.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchUsers(true)}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition cursor-pointer"
        >
          <FaSyncAlt className={refreshing ? "animate-spin text-red-600" : ""} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
        {loading ? (
          <div className="py-16 text-center text-sm text-gray-400">
            Loading registered users...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs uppercase bg-gray-50 text-gray-400 font-bold border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined Date</th>
                  <th className="px-4 py-3 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => {
                  const uid = u._id || u.id;
                  const isCurrent =
                    currentUser?._id === uid || currentUser?.id === uid;

                  return (
                    <tr key={uid} className="hover:bg-gray-50/70 transition">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center text-sm">
                            {u.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block">
                              {u.name}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] text-red-600 font-bold">
                                (You)
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-700">
                        {u.email}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                            u.role === "admin"
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {u.role === "admin" ? (
                            <FaUserShield className="text-xs" />
                          ) : (
                            <FaUser className="text-[10px]" />
                          )}
                          <span className="capitalize">{u.role}</span>
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-400">
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleDateString()
                          : "Recently"}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          disabled={isCurrent}
                          onClick={() => handleRoleToggle(uid, u.role)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                            u.role === "admin"
                              ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              : "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
                          }`}
                        >
                          {u.role === "admin" ? "Demote to User" : "Make Admin"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import LocalStorage from "../../managers/LocalStorage";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const user = LocalStorage.getUser();
  const { signout } = useAuth();

  const handleLogout = () => {
    signout();
    toast.success("Logout successfully");
  };
  return (
    <div className="relative bg-gray-800 h-full w-48 flex flex-col justify-between">
      <div className="mt-2">
        <ul>
          <li className="mb-4">
            <Link
              to="/"
              className="text-white hover:text-blue-500 hover:bg-gray-700 px-4 py-2 block flex items-center"
            >
              <FaChartLine className="mr-2" />
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
      {user?.role === "Admin" && (
        <div>
          <ul>
            <li className="mb-4">
              <Link
                to="/users"
                className="text-white hover:text-blue-500 hover:bg-gray-700 px-4 py-2 block flex items-center"
              >
                <FaUsers className="mr-2" />
                Users
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="mt-auto  justify-center items-center">
        <ul>
          <li className="mb-0"></li>
        </ul>
      </div>
      {user && (
        <div className="mt-auto  justify-center items-center">
          <ul>
            <li className="mb-4">
              <Link
                to="/login"
                className="text-white hover:text-blue-500 hover:bg-gray-700 px-4 py-2 block flex items-center"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

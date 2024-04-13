import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { LOGIN_USER } from "../../graphql/quries";
import LocalStorage from "../../managers/LocalStorage";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loginUser] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrors({
        email: formData.email ? "" : "Email is required",
        password: formData.password ? "" : "Password is required",
      });
      return;
    }

    try {
      const { data } = await loginUser({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (data?.loginUser.success) {
        LocalStorage.setToken(data?.loginUser?.token);
        LocalStorage.setUser(data?.loginUser?.user);
        setUser(data?.loginUser?.user);
        setIsLoggedIn(true);
        toast.success(data?.loginUser?.message);
        setFormData({
          email: "",
          password: "",
        });
        if (data?.loginUser?.user?.role === "Admin") {
          navigate("/users");
        } else {
          navigate("/");
        }
      } else {
        toast.error(data?.loginUser?.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div class=" min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div class="mt-2">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

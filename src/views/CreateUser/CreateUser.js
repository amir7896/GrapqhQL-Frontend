import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  GET_SINGLE_USER,
  CREATE_USER,
  UPDATE_USER,
} from "../../graphql/quries";
import { useQuery, useMutation } from "react-query";
import client from "../../graphql/apolloSetup";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";

const CreateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const mutation = id ? UPDATE_USER : CREATE_USER;

  // Get single user on update
  const { data: singleUser } = useQuery(
    ["user", id],
    async () => {
      const { data } = await client.query({
        query: GET_SINGLE_USER,
        variables: { userID: id },
      });
      console.log("get user response :", data?.getUser?.user);
      return data?.getUser;
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (singleUser?.user) {
      setUserFormData({
        username: singleUser.user.username,
        email: singleUser.user.email,
        address: singleUser.user.address,
      });
    }
  }, [singleUser?.user]);

  // Mutation
  const updateUserMutation = useMutation(
    (formData) =>
      client.mutate({
        mutation: mutation,
        variables: { userID: id, userInput: formData },
      }),
    {
      onSuccess: (data) => {
        const { createUser, updateUser } = data.data;

        if (createUser && createUser.success) {
          toast.success(createUser && createUser.message);
          navigate("/users");
        } else {
          toast.error(createUser && createUser.message);
        }

        if (updateUser && updateUser.success) {
          toast.success(updateUser && updateUser.message);
          navigate("/users");
        } else {
          toast.error(updateUser && updateUser.message);
        }
      },
      onError: (error) => {
        console.error("Error updating user:", error);
        toast.error(error.message);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserMutation.mutate(userFormData);
  };

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleBack = () => {
    navigate("/users");
  };

  return (
    <div className="container mx-auto">
      <div className="mt-1 mb-5">
        <button
          className="flex items-center justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleBack}
        >
          <IoIosArrowBack className="mr-1" /> Back
        </button>
      </div>
      <div class=" min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {id ? "Update User" : "Create New User"}
          </h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mt-1">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="username"
                  value={userFormData.username}
                  onChange={handleInputChange}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 "
                />
              </div>
            </div>
            {/* Email address */}
            <div className="mt-1">
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
                  value={userFormData.email}
                  onChange={handleInputChange}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                />
              </div>
            </div>
            {/* Password not updating password */}
            {!id && (
              <div className="mt-1">
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
                    value={userFormData.password}
                    onChange={handleInputChange}
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  />
                </div>
              </div>
            )}

            {/* Address */}
            <div className="mt-1">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="address"
                  value={userFormData.address}
                  onChange={handleInputChange}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 "
                />
              </div>
            </div>
            {/* Button */}
            <div className="mt-3">
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {id ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;

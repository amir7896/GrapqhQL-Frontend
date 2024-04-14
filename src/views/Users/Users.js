import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FaPlus } from "react-icons/fa";

import client from "../../graphql/apolloSetup";
import { useNavigate } from "react-router-dom";
import { GET_USERS, DELETE_USER } from "../../graphql/quries";
import { toast } from "react-toastify";

const Users = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState({ sortBy: "" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get users
  const {
    isLoading,
    isError,
    data,
    isFetching,
    refetch: refetchUsers,
  } = useQuery(["users", page, perPage, sort], async () => {
    const { data } = await client.query({
      query: GET_USERS,
      variables: { page, perPage, sort },
    });
    return data.getUsers.data;
  });

  const refetch = () => {
    refetchUsers();
  };

  useEffect(() => {
    setTimeout(() => {
      refetchUsers();
    }, [1000]);
  }, []);

  // Handle delete User
  const deleteUserMutation = useMutation(
    (userID) =>
      client.mutate({
        mutation: DELETE_USER,
        variables: { userID: userID },
        refetchQueries: [
          {
            query: GET_USERS,
            variables: { page, perPage, sort },
            awaitRefetchQueries: true,
          },
        ],
      }),
    {
      onSuccess: async (data) => {
        const { deleteUser } = data.data;
        if (deleteUser.success) {
          setTimeout(() => {
            refetch();
          }, [2000]);
          toast.success(deleteUser.message);
        } else {
          toast.error(deleteUser.message);
        }
      },
      onError: (error) => {
        console.error("Error deleting user:", error);
      },
    }
  );

  // Handle delete user
  const handleDeleteUser = (userId) => {
    deleteUserMutation.mutate(userId);
  };

  const detailUserNavigate = (id) => {
    navigate(`/users/detail/${id}`);
  };
  // Handle next
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Handle previous page
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Handle per page
  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value));
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSort({ sortBy: event.target.value });
    setPage(1);
  };

  // Handle filter
  const handleFilterChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setSort({ sortBy: value });
    setPage(1);
  };

  // Handle update navigate
  const handleUpdateNavigate = (userId) => {
    navigate(`/users/update/${userId}`);
  };

  // Handle create navigatge
  const handleCreateNavigate = () => {
    navigate("/users/create");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <label htmlFor="sortBy" className="mr-2">
            Sort By :
          </label>
          <select
            id="sortBy"
            value={sort.sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 px-3 py-2 rounded mr-2"
          >
            <option></option>

            <option value={"username"}>Username</option>
            <option value={"email"}>Email</option>
            <option value={"address"}>Address</option>
          </select>

          <label htmlFor="perPage" className="mr-3">
            Per Page :
          </label>
          <select
            id="perPage"
            value={perPage}
            onChange={handlePerPageChange}
            className="border border-gray-300 px-3 py-2 rounded mr-2"
          >
            <option value={2}>2 per page</option>
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
        <button
          className="flex items-center px-3 py-2 rounded bg-blue-500 text-white"
          onClick={handleCreateNavigate}
        >
          <FaPlus className="mr-1" />
          Create User
        </button>
      </div>

      <ul>
        {data &&
          data.map((user) => (
            <li key={user._id} className="mb-4">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <p className="font-bold">{user.username}</p>
                  <p className="text-gray-600 mt-2">{user.email}</p>
                  <p className="text-gray-600 mt-2">{user.address}</p>
                </div>
                <div className="px-4 py-3 bg-gray-100 border-t border-gray-200 flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                    onClick={() => handleUpdateNavigate(user?._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                    onClick={() => handleDeleteUser(user?._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={() => detailUserNavigate(user._id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={data?.length < perPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>

      {isFetching && <p>Fetching...</p>}
    </div>
  );
};

export default Users;

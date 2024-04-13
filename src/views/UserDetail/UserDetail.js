import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_SINGLE_USER } from "../../graphql/quries";
import client from "../../graphql/apolloSetup";
import { useQuery } from "react-query";
import { IoIosArrowBack } from "react-icons/io";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // Handle back
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
      <ul>
        <li className="mb-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <p className="font-bold"> {`ID: ${singleUser?.user?._id}`}</p>
              <p className="text-gray-600 mt-2">
                {`Name: ${singleUser?.user?.username}`}
              </p>
              <p className="text-gray-600 mt-2">{`Email: ${singleUser?.user?.email}`}</p>
              <p className="text-gray-600 mt-2">{`Address: ${singleUser?.user?.address}`}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UserDetail;

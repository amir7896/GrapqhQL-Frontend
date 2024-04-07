import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, CreateUser, DashBoard, Navbar, Users, Sidebar } from "../views";

const Routing = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Navbar />
          <div className="p-4 flex-grow">
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Routing;

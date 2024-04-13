import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  Login,
  CreateUser,
  DashBoard,
  Navbar,
  Users,
  Sidebar,
  UserDetail,
  UnAuthorized,
} from "../views";
import LocalStorage from "../managers/LocalStorage";

const Routing = () => {
  // Role base route access
  const RoleAccess = ({ roles = [] }) => {
    const user = LocalStorage.getUser();
    return !roles.length || roles.includes(user?.role) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" replace />
    );
  };

  // if user logged in then not navigate to login and singup page ..
  const Authenticated = ({ children }) => {
    const isAuthenticated = LocalStorage.isLoggedIn();
    const location = useLocation();
    if (isAuthenticated) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="h-screen flex">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Navbar />
          <div className="p-4 flex-grow overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route
                path="/login"
                element={
                  <Authenticated>
                    <Login />
                  </Authenticated>
                }
              />

              {/* Users */}
              <Route element={<RoleAccess roles={["Admin"]} />}>
                <Route path="/users" element={<Users />} />
              </Route>
              {/* Create User */}
              <Route element={<RoleAccess roles={["Admin"]} />}>
                <Route path="/users/create" element={<CreateUser />} />
              </Route>
              {/* Update User */}
              <Route element={<RoleAccess roles={["Admin"]} />}>
                <Route path="/users/update/:id" element={<CreateUser />} />
              </Route>
              {/* User Detail */}
              <Route element={<RoleAccess roles={["Admin"]} />}>
                <Route path="/users/detail/:id" element={<UserDetail />} />
              </Route>

              {/* Unautorized Route */}
              <Route path="/unauthorized" element={<UnAuthorized />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Routing;

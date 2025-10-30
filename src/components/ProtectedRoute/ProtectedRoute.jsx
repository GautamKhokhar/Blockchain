import React from "react";
import { Navigate } from "react-router-dom";
import { useRole } from "../../context/RoleContext"; // Adjust path as needed

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, loadingRole } = useRole();

  if (loadingRole) {
    return <p>Loading...</p>; // or spinner component
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/no-access" replace />;
  }

  return children;
};

export default ProtectedRoute;

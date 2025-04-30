import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    console.log(user, isLoaded, isSignedIn);
    // Wait until Clerk is fully loaded
    if (!isLoaded) {
      return <div>Loading...</div>; // You can replace this with a proper loading spinner
    }
  // Check if the user is signed in and has an admin role
  const isAdmin = isSignedIn && user.publicMetadata.role === "admin";

  return isAdmin ? <Outlet /> : <Navigate to="/location-error" replace />;
};

export default AdminRoute;

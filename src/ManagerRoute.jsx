import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const ManagerRoute = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    console.log(user, isLoaded, isSignedIn);
    // Wait until Clerk is fully loaded
    if (!isLoaded) {
      return <div className="flex flex-col items-center h-screen justify-center p-8">
      {/* Simple spinning circle */}
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-800 rounded-full animate-spin"></div>
      
      {/* Simple loading text */}
      <p className="mt-4 text-blue-800 font-medium">Loading...</p>
    </div>
    }
  // Check if the user is signed in and has a manager role
  const isManager = isSignedIn && user.publicMetadata.role === "manager";
  return isManager ? <Outlet /> : <Navigate to="/location-error" replace />;
};

export default ManagerRoute;

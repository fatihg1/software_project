import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import TicketsPage from './MyTicketsPage.jsx';

export default function TicketSignedIn() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/error" replace />;
  }

  return <TicketsPage />;
}

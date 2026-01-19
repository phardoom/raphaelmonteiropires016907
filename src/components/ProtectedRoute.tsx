import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "./ui/Loading";

export const ProtectedRoute = () => {
  const { token, isReady } = useAuth();

  if (!isReady) {
    return <Loading label="Carregando sessão..." />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

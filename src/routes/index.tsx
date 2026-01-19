import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AppLayout } from "../components/layout/AppLayout";
import { Login } from "../pages/Login";
import { Loading } from "../components/ui/Loading";

const PetsRoutes = lazy(() => import("./PetsRoutes"));
const TutorsRoutes = lazy(() => import("./TutorsRoutes"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/pets" replace />} />
          <Route
            path="/pets/*"
            element={
              <Suspense fallback={<Loading label="Carregando módulo pets..." />}>
                <PetsRoutes />
              </Suspense>
            }
          />
          <Route
            path="/tutores/*"
            element={
              <Suspense fallback={<Loading label="Carregando módulo tutores..." />}>
                <TutorsRoutes />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/pets" replace />} />
    </Routes>
  );
};

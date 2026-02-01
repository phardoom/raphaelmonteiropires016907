import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { ToastContainer } from "./components/ui/ToastContainer";

export const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AppRoutes />
          <ToastContainer />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
};

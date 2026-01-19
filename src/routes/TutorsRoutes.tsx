import { Route, Routes } from "react-router-dom";
import { TutorsList } from "../pages/TutorsList";
import { TutorNew } from "../pages/TutorNew";
import { TutorDetail } from "../pages/TutorDetail";

export const TutorsRoutes = () => {
  return (
    <Routes>
      <Route index element={<TutorsList />} />
      <Route path="new" element={<TutorNew />} />
      <Route path=":id" element={<TutorDetail />} />
    </Routes>
  );
};

export default TutorsRoutes;

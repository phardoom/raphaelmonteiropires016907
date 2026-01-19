import { Route, Routes } from "react-router-dom";
import { PetsList } from "../pages/PetsList";
import { PetNew } from "../pages/PetNew";
import { PetDetail } from "../pages/PetDetail";

export const PetsRoutes = () => {
  return (
    <Routes>
      <Route index element={<PetsList />} />
      <Route path="new" element={<PetNew />} />
      <Route path=":id" element={<PetDetail />} />
    </Routes>
  );
};

export default PetsRoutes;

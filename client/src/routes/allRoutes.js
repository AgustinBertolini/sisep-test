import React from "react";
import { Redirect } from "react-router-dom";
import Index from "../pages/Entrevista/Index";

const userRoutes = [
  {
    path: "/entrevista",
    component: Index,
  },
//   {
//     path: "/create-point-of-sale",
//     component: CreatePointOfSale,
//     p: ["p_PointsOfSale_Write", "p_IsAdministrator"],
//   },
  

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/home" /> },

];

export { userRoutes };

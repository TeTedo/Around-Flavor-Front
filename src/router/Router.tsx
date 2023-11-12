import React from "react";
import { useRoutes } from "react-router-dom";
import { BaseLayout } from "../layout/BaseLayout";
import { Home } from "../pages/home/Home";

export const Router = () => {
  const routes = [
    {
      path: "/",
      element: <BaseLayout />,
      children: [{ path: "/", element: <Home /> }],
    },
  ];

  return useRoutes(routes);
};

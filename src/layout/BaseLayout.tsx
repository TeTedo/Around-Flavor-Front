import React from "react";
import { Outlet } from "react-router-dom";
import { Wrapper } from "./BaseLayout.style";

export const BaseLayout = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

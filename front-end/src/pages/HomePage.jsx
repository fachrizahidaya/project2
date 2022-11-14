import React from "react";
import HomeComp from "../components/HomeComp";
import ItemComp from "../components/ItemComp";
import SidebarComp from "../components/SidebarComp";

export const HomePage = () => {
  return (
    <>
      <SidebarComp />
      <HomeComp />
      <ItemComp />
    </>
  );
};

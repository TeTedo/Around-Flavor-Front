import { Map } from "components/map/Map";
import { PlaceModal } from "components/modal/place/PlaceModal";
import React from "react";
import { HomeWrapper } from "./Home.style";

export const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <Map />
      <PlaceModal />
    </HomeWrapper>
  );
};

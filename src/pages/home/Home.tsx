import { Map } from "components/map/Map";
import { PlaceModal } from "components/modal/place/PlaceModal";
import React from "react";
import { HomeWrapper } from "./Home.style";
import { AdsenseModal } from "components/modal/adsense/AdsenseModal";

export const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <AdsenseModal />
      <Map />
      <PlaceModal />
    </HomeWrapper>
  );
};

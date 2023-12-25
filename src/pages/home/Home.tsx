import { Map } from "components/map/Map";
import { PlaceModal } from "components/modal/place/PlaceModal";
import React from "react";

export const Home: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <Map />
      <PlaceModal />
    </div>
  );
};

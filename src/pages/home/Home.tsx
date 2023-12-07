import { Map } from "components/map/Map";
import React from "react";
import { PickedPlace } from "components/pickedPlace/PickedPlace";

export const Home: React.FC = () => {
  return (
    <div>
      <Map />
      <PickedPlace />
    </div>
  );
};

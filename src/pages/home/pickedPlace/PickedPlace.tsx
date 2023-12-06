import React from "react";
import { useRecoilValue } from "recoil";
import { pickedPlaceState } from "recoil/placeState";
import { PickedPlaceWrapper } from "./PickedPlace.style";

export const PickedPlace: React.FC = () => {
  const pickedPlace = useRecoilValue<google.maps.places.PlaceResult | null>(
    pickedPlaceState
  );

  if (pickedPlace === null) return null;
  console.log(pickedPlace);
  return (
    <PickedPlaceWrapper>
      <div>name : {pickedPlace.name}</div>
    </PickedPlaceWrapper>
  );
};

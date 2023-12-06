import { atom } from "recoil";

export const pickedPlaceState = atom<google.maps.places.PlaceResult | null>({
  key: "placeState",
  default: null,
});

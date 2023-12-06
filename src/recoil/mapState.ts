import { atom } from "recoil";

export const mapState = atom<google.maps.places.PlacesService | null>({
  key: "mapState",
  default: null,
});

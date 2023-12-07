import { DefaultValue, atom, selector } from "recoil";

interface IPickedPlaceState {
  place: google.maps.places.PlaceResult | null;
}

export const pickedPlaceState = atom<IPickedPlaceState>({
  key: "placeState",
  default: { place: null },
});

export const pickedPlaceSelector =
  selector<google.maps.places.PlaceResult | null>({
    key: "pickedPlaceSelector",
    get: ({ get }) => {
      const state = get(pickedPlaceState);
      return state.place;
    },
    set: ({ set, get }, place) => {
      if (place instanceof DefaultValue) return;

      const prevState = get(pickedPlaceState);
      set(pickedPlaceState, { ...prevState, place });
    },
  });

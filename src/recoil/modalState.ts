import { atom } from "recoil";

export const adModalState = atom<boolean>({
  key: "adModalState",
  default: false,
});

export const placeModalState = atom<boolean>({
  key: "placeModalState",
  default: false,
});

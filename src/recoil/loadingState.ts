import { atom } from "recoil";

type LoadingType = {
  isLoading: boolean;
};

export const loadingState = atom<LoadingType>({
  key: "loadingState",
  default: { isLoading: false },
});

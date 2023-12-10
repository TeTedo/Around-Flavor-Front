import { atom } from "recoil";

export type ModalType = {
  isOpen: boolean;
  style: React.CSSProperties;
  children: React.ReactNode;
};

export const modalState = atom<ModalType>({
  key: "modalState",
  default: {
    isOpen: false,
    style: {},
    children: "",
  },
});

export const placeModalState = atom<boolean>({
  key: "placeModalState",
  default: false,
});

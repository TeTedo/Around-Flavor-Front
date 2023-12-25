import { DefaultValue, atom, selector } from "recoil";

interface ICenter {
  lat: number;
  lng: number;
}

type MapType = {
  center: ICenter;
  radius: number;
  openNow: boolean;
  searchCount: number;
};

export const mapState = atom<MapType>({
  key: "mapState",
  default: {
    center: { lat: 0, lng: 0 },
    radius: 300,
    openNow: true,
    searchCount: 0,
  },
});

export const searchCountSelector = selector<number>({
  key: "searchCountSelector",
  get: ({ get }) => {
    const map = get(mapState);
    return map.searchCount;
  },
  set: ({ set, get }, searchCount) => {
    if (searchCount instanceof DefaultValue) return;

    const prevState = get(mapState);
    set(mapState, { ...prevState, searchCount: searchCount + 1 });
  },
});

export const openSelector = selector<boolean>({
  key: "openSelector",
  get: ({ get }) => {
    const map = get(mapState);
    return map.openNow;
  },
  set: ({ set, get }, openNow) => {
    if (openNow instanceof DefaultValue) return;

    const prevState = get(mapState);
    set(mapState, { ...prevState, openNow });
  },
});

export const centerSelector = selector<ICenter>({
  key: "centerSelector",
  get: ({ get }) => {
    const map = get(mapState);
    return map.center;
  },
  set: ({ set, get }, center) => {
    if (center instanceof DefaultValue) return;

    const prevState = get(mapState);
    set(mapState, { ...prevState, center });
  },
});

export const radiusSelector = selector<number>({
  key: "radiusSelector",
  get: ({ get }) => {
    const map = get(mapState);
    return map.radius;
  },
  set: ({ set, get }, radius) => {
    if (radius instanceof DefaultValue) return;

    const prevState = get(mapState);
    set(mapState, { ...prevState, radius });
  },
});

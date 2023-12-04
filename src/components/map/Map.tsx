import {
  GoogleMap,
  Libraries,
  MarkerF,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounceHook } from "../../hook/useDebounceHook";

/**
 * google map
 * https://www.npmjs.com/package/@react-google-maps/api
 */
export const Map = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [radius, setRadius] = useState(300);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);
  const [randMarker, setRandMarker] = useState<google.maps.Marker | null>(null);
  const [noNearRes, setNoNearRes] = useState<boolean | null>(null);
  const [nearRes, setNearRes] = useState<google.maps.places.PlaceResult[]>([]);
  const [, setSelectedRes] = useState<google.maps.places.PlaceResult>();
  const [openNow, setOpenNow] = useState<boolean>(true);

  const debounce = useDebounceHook();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          alert("Unable to get location information.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // ============================ google map setting ====================================
  const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  if (!apiKey) {
    throw new Error("Google Maps API key is not defined.");
  }

  const center = useMemo(() => {
    return {
      lat: latitude,
      lng: longitude,
    };
  }, [latitude, longitude]);

  const mapContainerStyle = {
    width: "100%",
    height: "30rem",
  };

  const zoom = 16;
  const libraries: Libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const circleOptions = {
    strokeColor: "#FF0000", // Red color
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    center, // Center of the circle
    radius, // Radius in meters
  };

  // Callback function to handle map load
  const onLoad = (map: google.maps.Map | null) => {
    if (map) {
      const circle = new google.maps.Circle(circleOptions);
      circle.setMap(map);
      setMap(map);
      setCircle(circle);
    }
  };

  // Callback function to perform actions before the map component unmounts
  const onUnmount = useCallback((map: google.maps.Map | null) => {
    console.log("Do your stuff before map is unmounted");
  }, []);

  const onClick = (e: google.maps.MapMouseEvent) => {
    console.log("onClick args: ", e);
  };

  /**
   * https://developers.google.com/maps/documentation/javascript/places?hl=ko
   */

  const searchNearbyRestaurants = () => {
    // 사용자의 현재 위치를 기반으로 주변 레스토랑 검색
    if (!map) {
      alert("map can't loading...");
      return;
    }

    const placesService = new google.maps.places.PlacesService(map);
    performSearch(placesService, true);
  };

  const performSearch = (
    placesService: google.maps.places.PlacesService,
    isFirstSearch: boolean
  ) => {
    if (noNearRes) {
      alert("There is no restaurant near by marker.");
      return;
    }

    if (nearRes[0]) {
      selectNewResByList(nearRes);
      return;
    }

    if (isFirstSearch) firstSearch(placesService);
    else randSearch(placesService);
  };

  const firstSearch = (placesService: google.maps.places.PlacesService) => {
    const request = {
      location: center,
      type: "restaurant", // 레스토랑 타입으로 필터링
      openNow,
      radius,
    };

    placesService.nearbySearch(
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          alert("Failed to load random place.");
          return;
        }

        if (results === null) {
          alert("There is no restaurant near by marker.");
          setNoNearRes(true);
          return;
        }

        const operationalPlaces = results.filter(
          (store) => store.business_status === "OPERATIONAL"
        );

        if (operationalPlaces.length === 0) {
          alert("There is no restaurant near by marker.");
          setNoNearRes(true);
          return;
        }

        if (results.length < 20) {
          setNearRes(operationalPlaces);
          selectNewResByList(operationalPlaces);
        } else {
          performSearch(placesService, false);
        }
      }
    );
  };

  const selectNewResByList = (list: google.maps.places.PlaceResult[]) => {
    const len = list.length;
    const rand = Math.floor(Math.random() * len);
    const randRes = list[rand];
    setSelectedRes(randRes);
    setNewMarker(randRes);
  };

  const randSearch = (placesService: google.maps.places.PlacesService) => {
    const request = {
      location: generateRandomPoint(),
      type: "restaurant", // 레스토랑 타입으로 필터링
      openNow,
      rankBy: google.maps.places.RankBy.DISTANCE,
    };

    placesService.nearbySearch(
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          alert("Failed to load random place.");
          return;
        }

        if (results === null) {
          alert("There is no restaurant near by marker.");
          setNoNearRes(true);
          return;
        }

        const findOne = results.find(
          (store) =>
            store.business_status === "OPERATIONAL" && isWithinRadius(store)
        );

        if (findOne) {
          setNewMarker(findOne);
        } else {
          randSearch(placesService);
          return;
        }
      }
    );
  };

  function isWithinRadius(placeLocation: google.maps.places.PlaceResult) {
    if (placeLocation.geometry?.location === undefined) return false;

    const location = {
      lat: placeLocation.geometry.location.lat(),
      lng: placeLocation.geometry.location.lng(),
    };

    return (
      google.maps.geometry.spherical.computeDistanceBetween(location, center) <=
      radius
    );
  }

  const setNewMarker = (place: google.maps.places.PlaceResult) => {
    if (place.geometry === undefined) return;

    // 기존 마커 제거
    if (randMarker) {
      randMarker.setMap(null);
    }

    // 새로운 마커 생성
    const randPlace = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
    });

    setRandMarker(randPlace);
  };

  useEffect(() => {
    return () => {
      if (randMarker) {
        randMarker.setMap(null);
      }
    };
  }, [randMarker]);

  function generateRandomPoint() {
    const y0 = center.lat;
    const x0 = center.lng;
    const rd = radius / 111300; // about 111300 meters in one degree

    const u = Math.random();
    const v = Math.random();

    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    const newlat = y + y0;
    const newlon = x + x0;

    return new google.maps.LatLng(newlat, newlon);
  }
  // ============================ google map setting ====================================

  useEffect(() => {
    if (map && circle) {
      circle.setRadius(radius);
    }
  }, [radius, map, circle]);
  return (
    <div>
      {isLoaded && latitude && longitude && (
        <>
          <StandaloneSearchBox
            onPlacesChanged={() => {
              console.log();
            }}
          >
            <input
              type="text"
              placeholder="search"
              style={{ width: `240px`, height: `32px` }}
            />
          </StandaloneSearchBox>
          <select
            onChange={(e) => {
              setRadius(Number(e.target.value));
            }}
            defaultValue={"300"}
          >
            <option value="100">100m 이내</option>
            <option value="300">300m 이내</option>
            <option value="500">500m 이내</option>
            <option value="1000">1km 이내</option>
          </select>
          <select
            onChange={(e) => {
              setOpenNow(e.target.value ? true : false);
            }}
            defaultValue={1}
          >
            <option value={1}>영업 중</option>
            <option value={0}>모든 식당</option>
          </select>
          <button onClick={searchNearbyRestaurants}>주변 식당 찾기</button>
          <GoogleMap
            id="search-box-example"
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ disableDefaultUI: true }}
            onClick={onClick}
          >
            <MarkerF position={center}></MarkerF>
          </GoogleMap>
        </>
      )}
    </div>
  );
};

import {
  GoogleMap,
  Libraries,
  MarkerF,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";
import { pickedPlaceState } from "recoil/placeState";
import { MapUtils } from "utils/mapUtils";

/**
 * google map
 * https://www.npmjs.com/package/@react-google-maps/api
 */
export const Map: React.FC = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [radius, setRadius] = useState(300);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);
  const [randMarker, setRandMarker] = useState<google.maps.Marker | null>(null);
  const [noNearPlace, setNoNearPlace] = useState<boolean>(false);
  const [cachePlaces, setCachePlaces] = useState<
    google.maps.places.PlaceResult[]
  >([]);
  const [openNow, setOpenNow] = useState<boolean>(true);
  useEffect(() => {
    if (openNow === false) setCachePlaces([]);
  }, [openNow]);

  const setPickedPlace = useSetRecoilState(pickedPlaceState);

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
  const apiKey: string | undefined = useMemo(
    () => process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    []
  );

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

  const mapService: google.maps.places.PlacesService | null = useMemo(() => {
    if (!map) return null;
    return new google.maps.places.PlacesService(map);
  }, [map]);

  const searchNearbyRestaurants = () => {
    // 사용자의 현재 위치를 기반으로 주변 레스토랑 검색
    if (!map || !mapService) {
      alert("Google map can't loading...");
      return;
    }

    performSearch(mapService, true);
  };

  const performSearch = (
    mapService: google.maps.places.PlacesService,
    isFirstSearch: boolean
  ) => {
    if (noNearPlace) {
      alert("There is no restaurant near by marker.");
      return;
    }

    if (cachePlaces[0]) {
      pickPlaceByCache(cachePlaces, mapService);
      return;
    }

    if (isFirstSearch) firstSearch(mapService);
    else randSearch(mapService);
  };

  const firstSearch = (mapService: google.maps.places.PlacesService) => {
    const request = {
      location: center,
      type: "restaurant", // 레스토랑 타입으로 필터링
      openNow,
      radius,
    };

    mapService.nearbySearch(
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
          setNoNearPlace(true);
          return;
        }

        const operationalPlaces = results.filter(
          (store) => store.business_status === "OPERATIONAL"
        );

        if (operationalPlaces.length === 0) {
          alert("There is no restaurant near by marker.");
          setNoNearPlace(true);
          return;
        }

        if (results.length < 20) {
          setCachePlaces(operationalPlaces);
          pickPlaceByCache(operationalPlaces, mapService);
        } else {
          performSearch(mapService, false);
        }
      }
    );
  };

  const pickPlaceByCache = (
    cache: google.maps.places.PlaceResult[],
    mapService: google.maps.places.PlacesService
  ) => {
    const len = cache.length;
    const rand = Math.floor(Math.random() * len);
    const randPlace = cache[rand];
    setPickedPlace(randPlace);
    setNewMarker(randPlace);
  };

  const randSearch = (placesService: google.maps.places.PlacesService) => {
    const request = {
      location: MapUtils.generateRandomPoint(center.lat, center.lng, radius),
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
          setNoNearPlace(true);
          return;
        }

        const findOne = results.find(
          (store) =>
            store.business_status === "OPERATIONAL" && isWithinRadius(store)
        );

        if (findOne) {
          setNewMarker(findOne);
          setPickedPlace(findOne);
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
            <option value="100">100m</option>
            <option value="300">300m</option>
            <option value="500">500m</option>
            <option value="1000">1km</option>
          </select>
          <select
            onChange={(e) => {
              setOpenNow(e.target.value === "open" ? true : false);
            }}
            defaultValue={"open"}
          >
            <option value={"open"}>Open Now</option>
            <option value={"all"}>All Restaurant</option>
          </select>
          <button onClick={searchNearbyRestaurants}>Random Pick!</button>
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

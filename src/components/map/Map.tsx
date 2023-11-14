import {
  GoogleMap,
  Libraries,
  MarkerF,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";

/**
 * google map
 * https://www.npmjs.com/package/@react-google-maps/api
 */
export const Map = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [radius, setRadius] = useState(1000);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);
  const [randMarker, setRandMarker] = useState<google.maps.Marker | null>(null);

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

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const mapContainerStyle = {
    width: "100%",
    height: "30rem",
  };

  const zoom = 16;
  const libraries: Libraries = ["places"];

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
    performSearch(placesService, null);
  };

  const performSearch = (
    placesService: google.maps.places.PlacesService,
    pageToken: Number | null
  ) => {
    let allResults: any[] = [];
    const request = {
      location: center,
      radius: radius,
      type: "restaurant", // 레스토랑 타입으로 필터링
      pageToken,
    };
    placesService.nearbySearch(request, (results, status, pagination) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        allResults = allResults.concat(results);

        if (pagination?.hasNextPage) {
          pagination.nextPage(); // 다음 페이지 요청
        } else {
          console.log(allResults);
          if (!allResults.length) {
            // allResults가 비어있는 경우
            alert("There is no restaurant near by marker.");
            return;
          }

          // 기존 마커 제거
          if (randMarker) {
            randMarker.setMap(null);
          }

          const place = allResults.filter(
            (store) => store.business_status === "OPERATIONAL"
          );

          // 새로운 마커 생성
          const placeLen = place.length;
          const randNum = Math.floor(Math.random() * placeLen);
          const randPlace = new google.maps.Marker({
            map: map,
            position: place[randNum].geometry?.location,
            title: place[randNum].name,
          });

          setRandMarker(randPlace);
        }
      }
    });
  };
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
          >
            <option value="1000">1km 이내</option>
            <option value="3000">3km 이내</option>
            <option value="5000">5km 이내</option>
            <option value="10000">10km 이내</option>
            <option value="30000">30km 이내</option>
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

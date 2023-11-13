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
    center: center, // Center of the circle
    radius: radius, // Radius in meters
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

  // ============================ google map setting ====================================

  useEffect(() => {
    if (map && circle) {
      circle.setRadius(radius);
    }
  }, [radius]);
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

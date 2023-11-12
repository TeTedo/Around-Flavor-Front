import {
  GoogleMap,
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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  // Callback function to handle map load
  const onLoad = useCallback((map: any) => {
    if (map) {
    }
  }, []);

  // Callback function to perform actions before the map component unmounts
  const onUnmount = useCallback((map: any) => {
    console.log("Do your stuff before map is unmounted");
  }, []);

  // ============================ google map setting ====================================

  return (
    <div>
      {isLoaded && latitude && longitude && (
        <GoogleMap
          id="example-map"
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{ disableDefaultUI: true }}
        >
          <StandaloneSearchBox onPlacesChanged={() => {}}>
            <input
              type="text"
              placeholder="search"
              style={{ width: `240px`, height: `32px` }}
            />
          </StandaloneSearchBox>
          <MarkerF position={center}></MarkerF>
        </GoogleMap>
      )}
    </div>
  );
};

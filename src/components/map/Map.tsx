import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback } from "react";

export const Map = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "30rem",
  };

  const center = {
    lat: 37.5511694,
    lng: 126.9882266,
  };

  const zoom = 16;

  const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  if (!apiKey) {
    throw new Error("Google Maps API key is not defined.");
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  // Callback function to handle map load
  const onLoad = useCallback((map: any) => {
    if (map) {
      map.setCenter(center);
    }
  }, []);

  // Callback function to perform actions before the map component unmounts
  const onUnmount = useCallback((map: any) => {
    console.log("Do your stuff before map is unmounted");
  }, []);

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          id="example-map"
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{ mapTypeControl: false, disableDefaultUI: true }}
        >
          {/* Add your map content here */}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

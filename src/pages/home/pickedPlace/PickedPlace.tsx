import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { pickedPlaceState } from "recoil/placeState";
import {
  PickedPlaceWrapper,
  PlacePhoto,
  ReviewerProfile,
} from "./PickedPlace.style";

export const PickedPlace: React.FC = () => {
  const pickedPlace = useRecoilValue<google.maps.places.PlaceResult | null>(
    pickedPlaceState
  );
  const [placeDetails, setPlaceDetails] =
    useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    if (!pickedPlace) return;

    if (pickedPlace.place_id) {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails(
        { placeId: pickedPlace.place_id },
        (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setPlaceDetails(result);
          }
        }
      );
    }
  }, [pickedPlace]);

  if (!pickedPlace || !placeDetails) return null;
  console.log("placeDetails", placeDetails);
  console.log("pickedPlace", pickedPlace);
  return (
    <PickedPlaceWrapper>
      <div>name : {pickedPlace.name}</div>
      {placeDetails.photos?.map((photo, idx) => (
        <PlacePhoto src={photo.getUrl()} key={photo.getUrl()} loading="lazy" />
      ))}
      <div>rating : {placeDetails.rating}</div>
      <div>
        reviews ({placeDetails.reviews?.length})
        {placeDetails.reviews?.map((review) => (
          <div>
            <ReviewerProfile
              src={review.profile_photo_url}
              alt="reviewer_profile"
            />
            <div>{review.text}</div>
          </div>
        ))}
      </div>
    </PickedPlaceWrapper>
  );
};

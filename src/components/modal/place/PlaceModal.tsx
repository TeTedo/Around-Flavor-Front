import React, { useEffect, useState } from "react";
import { OpenModalBtn, PlaceModalWrapper, Top } from "./PlaceModal.style";
import { useRecoilValue } from "recoil";
import { pickedPlaceSelector } from "recoil/placeState";

export const PlaceModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const pickedPlace = useRecoilValue<google.maps.places.PlaceResult | null>(
    pickedPlaceSelector
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

  return (
    <>
      {/* open */}
      {pickedPlace && (
        <PlaceModalWrapper $isOpen={isOpen}>
          <Top.Wrapper>
            <Top.CloseBtn onClick={() => setIsOpen(false)}>X</Top.CloseBtn>
          </Top.Wrapper>
        </PlaceModalWrapper>
      )}

      {/* close */}
      {!isOpen && (
        <OpenModalBtn.Wrapper>
          <OpenModalBtn.OpenBtn onClick={() => setIsOpen(true)}>
            {"->"}
          </OpenModalBtn.OpenBtn>
        </OpenModalBtn.Wrapper>
      )}
    </>
  );
};

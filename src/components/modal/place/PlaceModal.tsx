import React, { useEffect, useState } from "react";
import {
  ContentWrapper,
  PickButton,
  PlaceModalWrapper,
  SelectOption,
  Title,
} from "./PlaceModal.style";
import { useRecoilValue } from "recoil";
import { pickedPlaceSelector } from "recoil/placeState";

export const PlaceModal = () => {
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

  return (
    <>
      {/* pickedPlace */}
      {!pickedPlace && (
        <PlaceModalWrapper $isPicked={pickedPlace !== null}>
          <ContentWrapper>
            <Title>
              <div>How about</div>
              <div>having a meal here?</div>
            </Title>
            <SelectOption.Wrapper>
              <SelectOption.Title>
                The distance between me and the restaurant
              </SelectOption.Title>
              <SelectOption.BtnWrapper>
                <SelectOption.Btn>100M</SelectOption.Btn>
                <SelectOption.Btn>300M</SelectOption.Btn>
                <SelectOption.Btn>500M</SelectOption.Btn>
                <SelectOption.Btn>1KM</SelectOption.Btn>
              </SelectOption.BtnWrapper>
            </SelectOption.Wrapper>
            <SelectOption.Wrapper>
              <SelectOption.Title>State of restaurant</SelectOption.Title>
              <SelectOption.BtnWrapper>
                <SelectOption.Btn>Open now</SelectOption.Btn>
                <SelectOption.Btn>All</SelectOption.Btn>
              </SelectOption.BtnWrapper>
            </SelectOption.Wrapper>
            <PickButton>Go Go Go Go</PickButton>
          </ContentWrapper>
        </PlaceModalWrapper>
      )}
    </>
  );
};

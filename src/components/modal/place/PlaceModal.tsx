import React, { useEffect, useState } from "react";
import {
  ContentWrapper,
  PickButton,
  PickedContent,
  PickedContentWrapper,
  PickedTitle,
  PlaceModalWrapper,
  SelectOption,
  Title,
} from "./PlaceModal.style";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { pickedPlaceSelector } from "recoil/placeState";
import {
  openSelector,
  radiusSelector,
  searchCountSelector,
} from "recoil/mapState";

export const PlaceModal = () => {
  const [radius, setRadius] = useRecoilState(radiusSelector);
  const [openState, setOpenState] = useRecoilState(openSelector);

  const pickedPlace = useRecoilValue<google.maps.places.PlaceResult | null>(
    pickedPlaceSelector
  );
  const [placeDetails, setPlaceDetails] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [searchCount, setSearchCount] = useRecoilState(searchCountSelector);

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

  const searchRandPlace = () => {
    setSearchCount(searchCount);
  };

  return (
    <>
      <PlaceModalWrapper>
        {/* no pickedPlace */}
        {!pickedPlace && (
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
                <SelectOption.Btn
                  onClick={() => setRadius(100)}
                  $isSelected={radius === 100}
                >
                  100M
                </SelectOption.Btn>
                <SelectOption.Btn
                  onClick={() => setRadius(300)}
                  $isSelected={radius === 300}
                >
                  300M
                </SelectOption.Btn>
                <SelectOption.Btn
                  onClick={() => setRadius(500)}
                  $isSelected={radius === 500}
                >
                  500M
                </SelectOption.Btn>
                <SelectOption.Btn
                  onClick={() => setRadius(1000)}
                  $isSelected={radius === 1000}
                >
                  1KM
                </SelectOption.Btn>
              </SelectOption.BtnWrapper>
            </SelectOption.Wrapper>
            <SelectOption.Wrapper>
              <SelectOption.Title>State of restaurant</SelectOption.Title>
              <SelectOption.BtnWrapper>
                <SelectOption.Btn
                  onClick={() => setOpenState(true)}
                  $isSelected={openState === true}
                >
                  Open now
                </SelectOption.Btn>
                <SelectOption.Btn
                  onClick={() => setOpenState(false)}
                  $isSelected={openState === false}
                >
                  All
                </SelectOption.Btn>
              </SelectOption.BtnWrapper>
            </SelectOption.Wrapper>
            <PickButton onClick={searchRandPlace}>Go Go Go Go</PickButton>
          </ContentWrapper>
        )}
        {/* no pickedPlace */}
        {pickedPlace && (
          <PickedContentWrapper>
            <PickedTitle>
              <div>{placeDetails?.name}</div>
            </PickedTitle>
            <PickedContent.Rate>★ {placeDetails?.rating}</PickedContent.Rate>
            <PickedContent.ImgWrapper>
              {placeDetails?.photos?.map((photo) => (
                <PickedContent.Img key={photo.getUrl()} src={photo.getUrl()} />
              ))}
            </PickedContent.ImgWrapper>
            <PickButton onClick={searchRandPlace}>Pick again</PickButton>
          </PickedContentWrapper>
        )}
      </PlaceModalWrapper>
    </>
  );
};

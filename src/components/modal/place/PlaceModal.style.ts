import { styled } from "styled-components";
import { MAP_SIZE } from "constants/mapConstant";
import { MOBILE_LAYOUT } from "constants/cssConstant";

export const PlaceModalWrapper = styled.div`
  width: 50%;
  height: 100vh;
  z-index: 99;
  display: flex;
  flex-direction: row-reverse;

  @media screen and (max-width: ${MOBILE_LAYOUT}) {
    width: 100%;
    height: 50vh;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  background: #eadfc8;
  padding-left: 7rem;
  padding-top: 15rem;

  @media screen and (max-width: ${MOBILE_LAYOUT}) {
    padding-top: 5rem;
  }
`;

export const PickedContentWrapper = styled.div`
  width: 100%;
  background: #fdeeeb;
  padding: 7rem;
  padding-top: 15rem;

  @media screen and (max-width: ${MOBILE_LAYOUT}) {
    padding-top: 5rem;
  }
`;

export const Title = styled.div`
  font-size: 5rem;
  font-weight: 800;

  @media screen and (max-width: ${MOBILE_LAYOUT}) {
    font-size: 8rem;
  }
`;

export const PickedTitle = styled.div`
  font-size: 5rem;
  font-weight: 800;

  @media screen and (max-width: ${MOBILE_LAYOUT}) {
    font-size: 6rem;
  }
`;

interface ISelected {
  $isSelected: boolean;
}

export const SelectOption = {
  Wrapper: styled.div`
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  `,
  Title: styled.div`
    font-size: 2rem;
    font-weight: 700;

    @media screen and (max-width: ${MOBILE_LAYOUT}) {
      font-size: 4rem;
    }
  `,
  BtnWrapper: styled.div`
    display: flex;
    gap: 2rem;

    @media screen and (max-width: ${MOBILE_LAYOUT}) {
      overflow: auto;
    }
  `,
  Btn: styled.div<ISelected>`
    padding: 1rem 5rem;
    border-radius: 3.6rem;
    background-color: ${(props) => (props.$isSelected ? "#694E16" : "white")};
    color: ${(props) => (props.$isSelected ? "white" : "black")};
    font-size: 1.7rem;
    font-weight: 700;
    cursor: pointer;

    @media screen and (max-width: ${MOBILE_LAYOUT}) {
    }
  `,
};

export const PickButton = styled.div`
  margin-top: 7rem;
  border-radius: 3.6rem;
  border: 8px solid #694e16;
  background-color: white;
  padding: 2rem 4rem;
  font-size: 2.6rem;
  font-weight: 800;
  width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #694e16;
    color: white;
  }
`;

export const PickedContent = {
  Rate: styled.div`
    margin-top: 2.3rem;
    font-size: 2.7rem;
    font-weight: 700;
  `,
  Reviews: styled.div``,
  Review: styled.div``,
  ImgWrapper: styled.div`
    margin-top: 5rem;
    width: 100%;
    height: 25rem;
    overflow: hidden;
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
  `,
};
export const Middle = {};
export const Bottom = {};

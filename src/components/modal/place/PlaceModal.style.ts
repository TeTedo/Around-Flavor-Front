import { styled } from "styled-components";
import { MAP_SIZE } from "constants/mapConstant";

interface IPlacePicked {
  $isPicked: boolean;
}

export const PlaceModalWrapper = styled.div<IPlacePicked>`
  width: 100%;
  height: ${MAP_SIZE.height};
  position: absolute;
  z-index: 99;
  background-color: ${(props) => (props.$isPicked ? "" : "#00000078")};

  border-radius: 1rem;
  display: flex;
  flex-direction: row-reverse;
`;

export const ContentWrapper = styled.div`
  width: 50%;
  background: #eadfc8;
  padding-left: 7rem;
  padding-top: 20rem;
`;

export const Title = styled.div`
  font-size: 5rem;
  font-weight: 800;
`;

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
  `,
  BtnWrapper: styled.div`
    display: flex;
    gap: 2rem;
  `,
  Btn: styled.div`
    padding: 1rem 5rem;
    border-radius: 3.6rem;
    background-color: white;
    font-size: 1.7rem;
    font-weight: 700;
    cursor: pointer;
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
export const Middle = {};
export const Bottom = {};

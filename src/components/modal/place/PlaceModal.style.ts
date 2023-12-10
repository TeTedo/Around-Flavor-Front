import { styled } from "styled-components";
import { MAP_SIZE } from "constants/mapConstant";

export const OpenModalBtn = {
  Wrapper: styled.div`
    position: absolute;
    z-index: 98;
    width: 3rem;
    height: 3rem;
    background-color: black;
    border-radius: 1rem;
  `,
  OpenBtn: styled.div`
    color: white;
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

interface PlaceModalWrapperProps {
  $isOpen: boolean;
}

export const PlaceModalWrapper = styled.div<PlaceModalWrapperProps>`
  width: 30%;
  height: ${MAP_SIZE.height};
  position: absolute;
  z-index: 99;
  background-color: white;
  border-radius: 1rem;
  transition: 1s;
  left: ${(props) => (props.$isOpen ? "0" : "-100%")};
`;

export const Top = {
  Wrapper: styled.div``,
  CloseBtn: styled.div`
    width: 10rem;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1.5rem;
    cursor: pointer;
  `,
};

export const Middle = {};
export const Bottom = {};

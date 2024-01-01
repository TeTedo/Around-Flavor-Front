import { styled } from "styled-components";

export const AdsenseModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AdContent = styled.div`
  width: 300px;
  height: 250px;
  z-index: 99;
`;

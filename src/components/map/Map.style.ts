import { MOBILE_LAYOUT } from "constants/cssConstant";
import { styled } from "styled-components";

export const MapWrapper = styled.div`
  width: 50%;
  height: 100vh;
  @media screen and (max-width: ${MOBILE_LAYOUT}) {
    width: 100%;
    height: 50vh;
  }
`;

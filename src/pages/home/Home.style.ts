import { MOBILE_LAYOUT } from "constants/cssConstant";
import { styled } from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;

  @media screen and (max-width: ${MOBILE_LAYOUT}) {
    flex-direction: column;
  }
`;

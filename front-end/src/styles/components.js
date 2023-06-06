import styled from "styled-components";
import { device } from "./breakpoints";

export const Content = styled.div`
  /* margin: 0 10px;
  display: flex;
  flex-direction: column;
  padding: 40px 5px;*/
  background-color: #f3f3f3; 
  height: 100%;
  width: 90%;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 10px;

  @media ${device.tablet} {
    /* max-width: 690px;
    margin: 0 auto;
    grid-gap: 50px; */
  }

  @media ${device.desktop} {
    /* max-width: 1100px; */
  }
`;

import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const Form = styled.form`
  display: flex;
  grid-gap: 30px;
  flex-direction: column;

  @media ${device.desktop} {
    display: grid;
  }
`;

export const TitleComponent = styled.form`
  padding: 15px 10px;
  background-color: #ffffff8a;
`;

export const Aviso = styled.p`
  color: #ff0000;
  // itálico
  font-style: italic;
  font-size: 13px;
`

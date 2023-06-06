import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const Container = styled.header`
  width: 100vw;
  background-color: #76C04D;
`;

export const Content = styled.div`
  /* width: 100%; */
  /* padding: 5px; */
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;


  @media ${device.laptop} {
    max-width: 690px;
    padding: 10px 0;
  }

  @media ${device.desktop} {
    max-width: 1100px;
  }
`;

export const Logo = styled.img`
  height: 60px;
`

export const NavList = styled.ul`
  display: flex;
  grid-gap: 15px;
  list-style: none;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #fff;
  
  
`;

export const Li = styled.li`
button {
    padding: 0 5px;
  }p {
    color: #fff;
  }
`;

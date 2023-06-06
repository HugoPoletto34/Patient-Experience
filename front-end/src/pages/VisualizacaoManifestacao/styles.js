import styled from "styled-components";
// import { device } from "../../styles/breakpoints";

export const Section = styled.section`
  width: 70%;
  padding: 10px;
  h1 {
    margin-bottom: 10px;
  }

  h3 {
    margin: 20px 0 20px 0;
  }

  h4 {
    margin-bottom: 40px;
    color: gray;
  }


`;

export const Aside = styled.aside`
  width: 30%;
  padding: 10px;

  h3 {
    margin: 20px 0px 20px 0px;
  }

`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: 10px auto;
  background-color: white;
  border-radius: 10px;
  border-color: gray;
  border-style: solid;
  border-width: 1px;
  padding: 10px;
`;

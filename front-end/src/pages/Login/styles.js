import styled from "styled-components";
import fundo from "../../imgs/Fachada-Concórdia-2.png";
export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: 'url(${fundo})';

`;

export const Form = styled.form`
  width: 400px;
  background: #ffffffe3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;


  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 46px;
    padding: 0 20px;
    color: #777;
    background-color: #fff;
    font-size: 15px;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
`;
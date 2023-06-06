import jwt_decode from "jwt-decode";

export const TOKEN_KEY = "@csx-Token";
export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return false;
  }
  let result = false;
  try {
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();
  
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 > currentDate.getTime()) {
      result = true;
    }
  } catch (error) {
    console.log("Invalid token");
  }
  


  return result;
};
export const getUserName = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return "";
  }
  let result = "";
  try {
    let decodedToken = jwt_decode(token);
    result = decodedToken.nome;
  } catch (error) {
    console.log("Invalid token");
  }
  return result;
};

export const getId = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return "";
  }
  let result = "";
  try {
    let decodedToken = jwt_decode(token);
    result = decodedToken.idUser;
  } catch (error) {
    console.log("Invalid token");
  }
  return result;
};

export const getPerfil = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return "";
  }
  let result = "";
  try {
    let decodedToken = jwt_decode(token);
    result = decodedToken.perfil;
  } catch (error) {
    console.log("Invalid token");
  }
  return result;
};

export const getSetor = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return "";
  }
  let result = "";
  try {
    let decodedToken = jwt_decode(token);
    result = decodedToken.setor;
  } catch (error) {
    console.log("Invalid token");
  }
  return result;
};

export const isNucleo = () => {
  return getPerfil() === "NUCLEO";
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
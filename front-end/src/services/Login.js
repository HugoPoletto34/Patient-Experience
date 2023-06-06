import api from "../components/services/api";

export default class LoginService {
  

  static async login(matricula, senha) {
    return await api
    .post("/login", { matricula, senha })
  }

}

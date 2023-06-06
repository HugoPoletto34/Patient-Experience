import api from "../components/services/api";

export default class TipoService {
  

  static async getTipos() {
    return await api
    .get("/tipo/listar")
    .then((response) => {
      return response.data;
    }
    )
    .catch((err) => {
      console.log(err);
    });
  }

  static async getTipoById(id) {
    return await api
    .get("/tipo/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  static async registro(data, msgSucesso, msgErro, acao) {
    api
      .post("/tipo/cadastrar", data)
      .then((response) => {
        if (response.status === 201) {
          alert(msgSucesso);
          acao();
        }
      })
      .catch(() => {
        alert(msgErro);
      });
  }

  static async delete(id, msgSucesso, msgErro, acao) {
    api
    .delete(`/tipo/deletar/id/${id}`)
    .then((response) => {
      if (response.status === 200) {
        alert(msgSucesso);
        acao();
      }
    })
    .catch(() => {
      alert(msgErro);
    });
  }
}

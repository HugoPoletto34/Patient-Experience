import api from "../components/services/api";

export default class AssuntoService {
  

  static async getAssuntos() {
    return await api
    .get("/assunto/listar")
    .then((response) => {
      return response.data;
    }
    )
    .catch((err) => {
      console.log(err);
    });
  }

  static async getAssuntoById(id) {
    return await api
    .get("/assunto/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  static async registro(data, msgSucesso, msgErro, acao) {
    api
      .post("/assunto/cadastrar", data)
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
    .delete(`/assunto/deletar/id/${id}`)
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

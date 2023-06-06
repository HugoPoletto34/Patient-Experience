import api from "../components/services/api";

export default class ClassificacaoService {
  

  static async getClassificacoes() {
    return await api
    .get("/classificacao/listar")
    .then((response) => {
      return response.data;
    }
    )
    .catch((err) => {
      console.log(err);
    });
  }

  static async getClassificacaoById(id) {
    return await api
    .get("/classificacao/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  static async registro(data, msgSucesso, msgErro, acao) {
    api
      .post("/classificacao/cadastrar", data)
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
    .delete(`/classificacao/deletar/id/${id}`)
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

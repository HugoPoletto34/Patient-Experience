import api from "../components/services/api";

export default class GrauParencescoService {
  

  static async getGrauParencescos() {
    return await api
    .get("/parentesco/listar")
    .then((response) => {
      return response.data;
    }
    )
    .catch((err) => {
      console.log(err);
    });
  }

  static async getGrauParencescoById(id) {
    return await api
    .get("/parentesco/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  static async registro(data, msgSucesso, msgErro, acao) {
    api
      .post("/parentesco/cadastrar", data)
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
    .delete(`/parentesco/deletar/id/${id}`)
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

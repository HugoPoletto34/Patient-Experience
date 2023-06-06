import api from "../components/services/api";

export default class ManifestacaoService {
  

  static async getManifestacoes() {
    return await api
    .get("/manifestacao/listar/table")
    .then((response) => {
      return response.data;
    }
    )
    .catch((err) => {
      console.log(err);
    });
  }

  static async getManifestacaoById(id) {
    return await api
    .get("/manifestacao/mostrar/id/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  static async getManifestacaoByIdToTable(id) {
    return await api
    .get("/manifestacao/mostrar/table/id/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  static async getManifestacaoBySetor(setor) {
    return await api
    .get("/manifestacao/listar/setor/" + setor)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  static async registro(data, msgSucesso, msgErro, acao) {
    api
      .post("/manifestacao/cadastrar", data)
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

  static async registroRetroalimentacao(data, id, msgSucesso, msgErro, acao) {
    api
      .post("/manifestacao/"+id+"/registrar-retroalimentacao", data)
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

  static async delete(id, msgSucesso, msgErro, acao) {
    console.log(id, msgSucesso, msgErro, acao)
    api
    .delete(`/manifestacao/deletar/id/${id}`)
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

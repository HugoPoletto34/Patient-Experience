import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Content } from "../../styles/components";
import { Aviso, Form, TitleComponent } from "./styles";
import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import SetorAutocomplete from "../../components/Autocompletes/SetorAutocomplete";
import CanalComunicacaoAutocomplete from "../../components/Autocompletes/CanalComunicacaoAutocomplete";
import AssuntoAutocomplete from "../../components/Autocompletes/AssuntoAutocomplete";
import TipoAutocomplete from "../../components/Autocompletes/TipoAutocomplete";
import LeitoAutocomplete from "../../components/Autocompletes/LeitoAutocomplete";
import GrauParentescoAutocomplete from "../../components/Autocompletes/GrauParentescoAutocomplete";
import ClassificacaoAutocomplete from "../../components/Autocompletes/ClassificacaoAutocomplete";
import { useNavigate } from "react-router-dom";
import ManifestacaoService from "../../services/Manifestacao";
import api from "../../components/services/api";

export default function CadastroManifestacao() {
  var navigate = useNavigate();
  let { id } = useParams();
  const [diasUteis, setDiasUteis] = useState(0);
  const [showDiaRetorno, setShowDiaRetorno] = useState(false);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      paciente: "",
      contato: "",
      setor: { nomeSetor: "" },
      canalComunicacao: { canal: "" },
      grauParentesco: { grauParentesco: "" },
      classificacao: { classificacao: "", diasUtil: 0 },
      dataInicioManifestacao: new Date().toISOString().slice(0, 10),
      dataFinalManifestacao: "",
      assunto: { assunto: "" },
      tipo: { tipo: "" },
      leito: { leito: "" },
      relato: "",
    }
  );


  const handleInput = (event) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ManifestacaoService.registro(formInput, component.msgSucesso, component.msgErro, () => navigate("/dashboard"));
  };

  useEffect(() => {
    if (id) {
      setShowDiaRetorno(true);
      ManifestacaoService.getManifestacaoById(id).then((response) => {
        setFormInput(response);
      });
      
    }
    console.log(ManifestacaoService.getManifestacaoById(id))
  }, [id]);

  async function handleDataRetorno() {
    await api
      .get("/manifestacao/mostrar/proximo-dia-util", {
        params: { dataInicio: formInput.dataInicioManifestacao, diasUteis: diasUteis },
      })
      .then((response) => {
        setFormInput({ ...formInput, dataFinalManifestacao: response.data });
      })
      .catch(() => {
        alert("ops! ocorreu um erro ao calcular o dia de retorno. Porém você pode inserir o dia de retorno manualmente.");
      });
  }

  const component = {
    title: "Nova Manifestação",
    subtitle: "Registrar nova manifestacao do cliente",
    buttonText: "Registrar",
    msgSucesso: "Registrado com sucesso!",
    msgErro: "Erro ao registrar manifestação!",
  };

  if (id) {
    component.title = "Atualização da Manifestação";
    component.subtitle =
      "Preencha os campos abaixo para atualizar a manifestação";
    component.buttonText = "Atualizar Manifestação";
    component.msgSucesso = "Atualizado com sucesso!";
    component.msgErro = "Erro ao atualizar manifestação!";
  }

  const handleInputValue = (newValue) => {
    if (newValue !== "" && formInput.dataInicioManifestacao !== "") {
      setShowDiaRetorno(true);
    } else {
      setShowDiaRetorno(false);
    }
  };

  return (
    <>
      <Content>
        <TitleComponent>
          <h1>{component.title}</h1>
          <p>{component.subtitle}</p>
        </TitleComponent>
        <Form action="/" method="POST" onSubmit={handleSubmit}>
          <div className="grid-two-cols">
            <TextField
              id="outlined-required"
              label="Nome do Paciente"
              name="paciente"
              value={formInput.paciente}
              fullWidth
              onChange={handleInput}
            />
            <TextField
              id="outlined-required"
              label="Contato do manifestante"
              name="contato"
              value={formInput.contato}
              fullWidth
              onChange={handleInput}
            />
          </div>

          <div className="grid-two-cols">
            <GrauParentescoAutocomplete
              formInput={formInput}
              setFormInput={setFormInput}
            />

            <CanalComunicacaoAutocomplete
              value={formInput.canalComunicacao.canal}
              setFormInput={(event, newValue) => {
                setFormInput({ canalComunicacao: {canal: newValue} });
              }}
            />
          </div>
          <div className="grid-two-cols">
            <AssuntoAutocomplete
              formInput={formInput}
              setFormInput={setFormInput}
            />
            <TipoAutocomplete
              formInput={formInput}
              setFormInput={setFormInput}
            />
          </div>
          <div className="grid-two-cols">
            <LeitoAutocomplete
              formInput={formInput}
              setFormInput={setFormInput}
            />
            <SetorAutocomplete
              formInput={formInput}
              setFormInput={setFormInput}
            />
          </div>
          <div className="grid-two-cols">
            <ClassificacaoAutocomplete
              formInput={formInput}
              setFormInput={setFormInput}
              setDiasUteis={setDiasUteis}
              handleInputValue={handleInputValue}
            />
            {showDiaRetorno && <Aviso>* O botão <u>CALCULAR</u> retorna o <u>DIA ÚTIL</u> de retorno de acordo com a <u>CLASSIFICAÇÃO</u> e <u>DIA DE INÍCIO</u> informado. Porém, é possível colocar a data de retorno MANUALMENTE na caixa abaixo.<br />
            <strong>Desconsidera <u>somente</u> feriados NACIONAIS; Sábados e Domingos.</strong></Aviso>}
          </div>
          <div className="grid-two-cols">
            <TextField
              type="date"
              id="outlined-required"
              label="Data de Início"
              value={formInput.dataInicioManifestacao}
              onChange={(e) => setFormInput({ ...formInput, dataInicioManifestacao: e.target.value })}
            />
            {showDiaRetorno && (
              <div className="grid-two-cols">
                <TextField
                  type="date"
                  value={formInput.dataFinalManifestacao}
                  onChange={(e) => setFormInput({ ...formInput, dataFinalManifestacao: e.target.value })}

                />
                <Button
                  style={{ textTransform: "none" }}
                  variant="contained"
                  color="success"
                  onClick={handleDataRetorno}
                  aria-label="ads"
                >
                  Calcular para {diasUteis} {diasUteis > 1 ? "dias úteis" : "dia útil"}
                </Button>
              </div>
            )}
          </div>

          <TextField
            required
            id="outlined-multiline-static"
            label="Relato"
            value={formInput.relato}
            multiline
            onChange={handleInput}
            rows={4}
            name="relato"
          />
          <Button type="submit" variant="contained">
            {component.buttonText}
          </Button>
        </Form>
      </Content>
    </>
  );
}

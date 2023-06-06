import {  useParams } from "react-router-dom";
import { Content } from "../../styles/components";
import { useEffect, useReducer, useState } from "react";
import { Section, Container, Aside } from "./styles";
import ManifestacaoService from "../../services/Manifestacao";
import { Button, TextField } from "@mui/material";
import CanalComunicacaoAutocomplete from "../../components/Autocompletes/CanalComunicacaoAutocomplete";
import api from "../../components/services/api";
// import CanalComunicacaoAutocomplete from "../../components/Autocompletes/CanalComunicacaoAutocomplete";
export default function VisualizacaoManifestacao() {
  let { id } = useParams();
  const [manifestacao, setManifestacao] = useState({});

  useEffect(() => {
    if (id) {
      ManifestacaoService.getManifestacaoByIdToTable(id).then((response) => {
        setManifestacao(response);
      });
    }
  }, [id, setManifestacao]);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      dataRespostaRetroalimentacao: new Date().toISOString().slice(0, 10),
      canalComunicacao: "",
      observacao: "",
      dataFinalRetroalimentacao: "",
      resposta: "",
    }
  );

  const component = {
    title: "Retroalimentação à Manifestação",
    subtitle: "Registrar nova retroalimentação à manifestacao do cliente",
    buttonText: "Registrar",
    msgSucesso: "Registrado com sucesso!",
    msgErro: "Erro ao registrar retroalimentação!",
  };

  const handleInput = (event) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .post("/manifestacao/"+id+"/registrar-retroalimentacao", formInput)
      .then(() => {
        alert(component.msgSucesso);
        window.location.href = "/dashboard";
      })
      .catch(() => {
        alert(component.msgErro);
      });
  };



  return (
    <Content>
      {manifestacao !== {} && (
        <Container>
          <Section>
            <h1>
              {id} - {manifestacao.assunto}
            </h1>
            <h4>{manifestacao.tipo}</h4>

            <h3>Relato</h3>
            <p>{manifestacao.relato}</p>
            <h3>Setor Responsável</h3>
            <p>{manifestacao.setor}</p>
            <h3>Data</h3>
            <p>{manifestacao.dataInicioManifestacao}</p>
          </Section>
          <Aside>
            <h3>Manifestante</h3>
            <p>{manifestacao.paciente}</p>
            <h3>Grau de Parentesco</h3>
            <p>{manifestacao.grauParentesco}</p>
            <h3>Contato</h3>
            <p>{manifestacao.contato}</p>
            <h3>Canal de Comunicação</h3>
            <p>{manifestacao.canalComunicacao}</p>
          </Aside>
        </Container>
        
      )}
      {manifestacao.respostaSetor != "Não respondida" && <Container>
          <Section>
            <h1>
              Resposta do Setor Responsável
            </h1>

            <h3>Resposta</h3>
            <p>{manifestacao.respostaSetor}</p>
            <h3>Observação</h3>
            <p>{manifestacao.observacao}</p>

          </Section>
          <Aside>
            <h3>Data Retorno do Setor</h3>
            <p>{manifestacao.dataResposta}</p>
            <h3>Cumprimento de Prazo</h3>
            <p>{manifestacao.cumprimentoPrazo}</p>
          </Aside>

          
        </Container>}

        {manifestacao.respostaSetor != "Não respondida" && manifestacao.retroalimentacao && <Container>
          <Section>
            <h1>
              Retroalimentação
            </h1>

            <h3>Data da Resposta</h3>
            <p>{manifestacao.dataRespostaRetroalimentacao}</p>
            <h3>Resposta</h3>
            <p>{manifestacao.respostaRetroalimentacao}</p>
            <h3>Observação</h3>
            <p>{manifestacao.observacaoRetroalimentacao}</p>
            <h3>Canal de Comunicação Utilizado</h3>
            <p>{manifestacao.canalComunicacaoRetroalimentacao}</p>
            <h3>Data Final</h3>
            <p>{manifestacao.dataFinalRetroalimentacao}</p>

          </Section>
          <Aside>
            <h3>Data da Retroalimentação</h3>
            <p>{manifestacao.dataRetroalimentacao}</p>
            <h3>Cumprimento de Prazo</h3>
            <p>{manifestacao.cumprimentoPrazoRetroalimentacao}</p>
          </Aside>

          
        </Container>}
        {manifestacao.respostaSetor != "Não respondida" && 

              <form onSubmit={handleSubmit} >
                <h1>Registrar Retroalimentação</h1>
          <div className="grid-two-cols" style={{margin: '10px'}}>
            <TextField
              id="outlined-required"
              label="Resposta"
              name="resposta"
              value={formInput.resposta}
              fullWidth
              multiline
              onChange={handleInput}
            />
            <TextField
              id="outlined-required"
              label="Observação"
              name="observacao"
              value={formInput.observacao}
              fullWidth
              multiline
              onChange={handleInput}
            />
          </div>
          <CanalComunicacaoAutocomplete
          style={{margin: '10px'}}
              value={formInput.canalComunicacao}
              handleChange={(event, newValue) => {
                setFormInput({ canalComunicacao: newValue });
              }}
            />
          <div className="grid-two-cols" style={{margin: '10px'}}>
            
            <TextField
                type={"date"}
                name="dataRespostaRetroalimentacao"
                label={"Data da Resposta"}
                value={formInput.dataRespostaRetroalimentacao}
                onChange={handleInput}
              />
              <TextField
              type={"date"}
              label={"Data Final"}
              name="dataFinalRetroalimentacao"
              value={formInput.dataFinalRetroalimentacao}
              onChange={handleInput}
            />
          </div>


          <Button type="submit" variant="contained">
            {component.buttonText}
          </Button>
        </form>}
      
            
    </Content>
  );
}

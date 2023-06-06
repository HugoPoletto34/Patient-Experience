import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Content } from "../../styles/components";
import { Form, TitleComponent } from "./styles";
import api from "../../components/services/api";
import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";

import { Aside, Container, Section } from "../VisualizacaoManifestacao/styles";
import ManifestacaoService from "../../services/Manifestacao";

export default function RespostaManifestacao() {
  let { id } = useParams();


  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      resposta: "",
      observacao: "",
    }
  );

  
  const [manifestacao, setManifestacao] = useState({});

  const handleInput = (event) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api.post(`/manifestacao/${id}/registrar-resposta`, formInput).then(() => {
      alert(component.messageText);
    });
  };

  useEffect(() => {
    if (id) {
      ManifestacaoService.getManifestacaoByIdToTable(id).then((response) => {
        setManifestacao(response);
      });
    }
  }, [id]);

  const component = {
    title: "Resposta à Manifestação",
    subtitle: "Registrar nova resposta à manifestacao do cliente",
    buttonText: "Registrar",
    messageText: "Registrado com sucesso!",
  };
  return (
    <>
      <Content>
        <TitleComponent>
          <h1>{component.title}</h1>
          <p>{component.subtitle}</p>
        </TitleComponent>
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
        {manifestacao.respostaSetor && <Container>
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
        {manifestacao.respostaSetor == "Não respondida" && 

              <Form action="/" method="POST" onSubmit={handleSubmit}>
          <div className="grid-two-cols">
            <TextField
              id="outlined-required"
              label="Resposta"
              name="resposta"
              value={formInput.resposta}
              fullWidth
              multiline
              rows={4}
              onChange={handleInput}
            />
            <TextField
              id="outlined-required"
              label="Observação"
              name="observacao"
              value={formInput.observacao}
              fullWidth
              multiline
              rows={4}
              onChange={handleInput}
            />
          </div>

          <Button type="submit" variant="contained">
            {component.buttonText}
          </Button>
        </Form>}
      </Content>
    </>
  );
}

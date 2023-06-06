import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Content } from "../../styles/components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import { Autocomplete } from "@mui/material";
import { TitleComponent } from "../CadastroManifestacao/styles";
import UsuarioService from "../../services/Usuario";
import SetorService from "../../services/Setor";

export default function CadastroUsuario() {
  const navigate = useNavigate();
  let { matricula } = useParams();
  const [ setores, setSetores ] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: "",
      nome: "",
      email: "",
      matricula: "",
      setor: ""
    }
  );


  useEffect(() => {


    SetorService.getSetores().then((response) => {
      const res = [];
        response.forEach((setor) => {
          res.push(setor.nomeSetor);
        });
        setSetores(res);
    });
    if (matricula) {
      UsuarioService.getUsuarioByMatricula(matricula).then((response) => {
          setFormInput(response);
        }
      );
    }

  }, [matricula]);






  const component = {
    title: "Cadastro de Usuário",
    subtitle: "Preencha os campos abaixo para cadastrar um novo coordenador de setor",
    buttonText: "Criar Conta",
    msgSucesso: "Cadastrado com sucesso!",
    msgErro: "Erro ao cadastrar!",
  }
  
  if (matricula) {
    component.title = 'Atualização do Usuário';
    component.subtitle = 'Preencha os campos abaixo para atualizar o usuário';
    component.buttonText = 'Atualizar Usuário';
    component.msgSucesso = 'Atualizado com sucesso!';
    component.msgErro = 'Erro ao atualizar!';
  }





  const handleInput = (event) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setFormInput({ [name]: newValue });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    UsuarioService.registro(formInput, component.msgSucesso, component.msgErro, () => navigate("/dashboard"));


  };
  return (
    <>
      <Content>
        <TitleComponent>
          <h1>{component.title}</h1>
          <p>{component.subtitle}</p>
        </TitleComponent>
        <form
          action="/"
          method="POST"
          onSubmit={handleSubmit}
          className="grid-two-cols"
        >
          {matricula && <TextField
            label="ID"
            name="id"
            disabled
            value={formInput.id}
            onChange={handleInput}
          />}
          <TextField
            required
            label="Nome"
            name="nome"
            value={formInput.nome}
            onChange={handleInput}
          />
          <TextField
            required
            label="Matricula"
            name="matricula"
            value={formInput.matricula}
            onChange={handleInput}
          />
          <TextField
            required
            label="Email Coorporativo"
            name="email"
            value={formInput.email}
            onChange={handleInput}
          />
          <Autocomplete
            value={formInput.setor}
            onChange={(event, newValue) => {
              setFormInput({ setor: newValue });
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="combo-box-demo"
            options={setores}
            renderInput={(params) => <TextField {...params} label="Setor" />}
          />

          <Button type="submit" variant="contained">
            {component.buttonText}
          </Button>
        </form>
      </Content>
    </>
  );
}

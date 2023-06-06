import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { login } from "../../components/services/auth";
import fundo from "../../imgs/Fachada-Concórdia-2.png";
import { Form, Container } from "./styles";
import LoginService from "../../services/Login";

function SignIn() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [state, setState] = useState({
    carregando: false,
    error: ""
  });

  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setState({ carregando: true });
    if (!matricula || !senha) {
      setState({ error: "Preencha a matrícula e senha para continuar!", carregando: false });
    } else {
      LoginService.login(matricula, senha).then((response) => {
        login(response.data)
        navigate("/dashboard");
      }).catch(() => {
        setState({ error: "Houve um problema com o login, verifique suas credenciais. T.T", carregando: false });

      });
      
    }
  };
  return (
    <Container
      style={{
        backgroundImage: `linear-gradient(320deg , transparent, rgba(22, 22, 22, 0.301) 50.83%, #000000 100%), url(${fundo})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "left",
        height: "100vh",
        boxShadow: "3px 3px red, -1em 0 0.4em olive",
        opacity: "0.9",
      }}
    >
      <Form onSubmit={handleSignIn}>
        <h1 style={{ margin: 10 }}>Entrar</h1>
        <hr />

        {state.error && <p>{state.error}</p>}
        <p
          id="show-me"
          style={{ display: state.carregando ? 'block' : 'none', transition: "display 0.2s ease" }}
        >
          Carregando...
        </p>
        <TextField
          required
          style={{ margin: 10 }}
          type="number"
          placeholder="Matrícula"
          defaultValue={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        <TextField
          required
          style={{ margin: 10 }}
          type="password"
          placeholder="Senha"
          defaultValue={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <hr />

        <Button color="success" variant="contained" type="submit">
          Entrar
        </Button>
      </Form>
    </Container>
  );
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter(SignIn);

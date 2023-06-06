import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../components/services/api";
import UsuarioService from "../../services/Usuario";
import { Container } from "../Login/styles";

function ResetPassword() {
  const { id } = useParams();
  const [colaborador, setColaborador] = useState({});
  const [values, setValues] = useState({
    password: "",
    secondPassword: "",
    showPassword: false,
    showSecondPassword: false,
  });

  useEffect(() => {
    UsuarioService.getUsuarioById(id)
      .then((response) => {
        setColaborador(response);
      })
      .catch(() => {
        document.getElementById("tela").innerHTML = "<h1>Link inválido</h1>";
      });
  }, [id]);

  const handleChangePass = (prop) => (event) => {
    const newValue = event.target.value;
    setValues({ ...values, [prop]: newValue });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSecondChangePass = (prop) => (event) => {
    const newValue = event.target.value;
    setValues({ ...values, [prop]: newValue });
  };

  const handleSecondClickShowPassword = () => {
    setValues({
      ...values,
      showSecondPassword: !values.showSecondPassword,
    });
  };

  const handleMouseDownSecondPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.password === values.secondPassword) {
      api
        .patch("/colaborador/reset-password", {
          id: colaborador.id,
          novaSenha: values.password,
        })
        .then(() => {
          document.getElementById("aviso").innerHTML =
            "<h1>Senha alterada com sucesso!</h1>";
          window.location.href = "/dashboard";
        })
        .catch(() => {
          document.getElementById("aviso").innerHTML =
            "<h1 >Não foi possível alterar sua senha</h1>";
        });
    } else {
      document.getElementById("aviso").innerHTML =
        "<h1 >As senhas não são iguais</h1>";
    }
  };

  return (
    <Container
      style={{
        height: "100vh",
        opacity: "0.9",
      }}
    >
      <form action="/" method="POST" onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: 10, textAlign: "center" }}>
          Criar nova senha
        </h1>
        <div id="aviso"></div>

        <hr style={{ margin: 10 }} />
        <div style={{ display: "flex", flexFlow: "column" }}>
          <FormControl variant="outlined">
            <OutlinedInput
              required
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              name="senha"
              onChange={handleChangePass("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Insira a Senha"
            />
          </FormControl>
          <FormControl sx={{ m: 5, margin: 0 }} variant="outlined">
            <OutlinedInput
              required
              id="outlined-adornment-second-password"
              type={values.showSecondPassword ? "text" : "password"}
              value={values.secondPassword}
              name="segundaSenha"
              onChange={handleSecondChangePass("secondPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSecondClickShowPassword}
                    onMouseDown={handleMouseDownSecondPassword}
                    edge="end"
                  >
                    {values.showSecondPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Insira novamente a Senha"
            />
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Enviar
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default ResetPassword;

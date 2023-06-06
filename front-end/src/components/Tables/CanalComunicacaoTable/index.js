import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";
import BaseCollapsibleTable from "../BaseCollapsibleTable";
import { Box, Collapse, TextField } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CanalComunicacaoService from "../../../services/CanalComunicacao";

const columns = [
  { id: "canal", label: "Canal de Comunicação", minWidth: 170 }
];

function createData(id, canal) {
  return {
    id, canal
  };
}

export default function CanalComunicacaoTable() {
  const [comunicacao, setCanalComunicacao] = React.useState([]);

  function handleDelete(id) {
    const result = confirm("Deseja realmente excluir o canal?");
    if (result) {
      CanalComunicacaoService.delete(id, "CanalComunicacao excluído com sucesso!", "Erro ao excluir canal!", () => window.location.reload());
    }
  }

  React.useEffect(() => {
    CanalComunicacaoService.getCanalComunicacoes().then((response) => {
      setCanalComunicacao(
        response.map((item) =>
          createData(
            item.id,
            item.canal
          )
        )
      );
    });

  }, [setCanalComunicacao]);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.white,
    backgroundColor: lightBlue[500],
    "&:hover": {
      backgroundColor: lightBlue[700],
    },
  }));

  const component = {
    title: "Cadastro de Usuário",
    subtitle:
      "Preencha os campos abaixo para cadastrar um novo coordenador de canal",
    buttonText: "Editar",
    messageText: "Cadastrado com sucesso!",
  };
  const [id, setId] = React.useState('');

  const ButtonAcoes = (row, openEdit, setOpen) => (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <ColorButton
        size="small"
        color="secondary"
        onClick={() => {
          setOpen(!openEdit);
          setId(row.id);
        }}
      >
        <EditIcon fontSize="small" />
        {openEdit ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </ColorButton>
      <Button size="small" color="error" onClick={() => handleDelete(row.id)}>
        <DeleteIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
  const [openCreate, setOpenCreate] = React.useState(false);
  
  const handleCreate = (event) => {
    event.preventDefault();
    const data = { canal: event.currentTarget.canalCriar.value };
    CanalComunicacaoService.registro(data, "CanalComunicacao cadastrado com sucesso!", "Erro ao cadastrar canal!", () => window.location.reload());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { canal: event.currentTarget.canal.value, id };
    CanalComunicacaoService.registro(data, "CanalComunicacao atualizado com sucesso!", "Erro ao atualizar canal!", () => window.location.reload());
  };

  const CollapseComponent = (row, open) => (
      <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <form onSubmit={handleSubmit} key={row.canal}>
                <TextField
                  name="canal"
                  label="CanalComunicacao"
                  fullWidth
                  defaultValue={row.canal}
                />
                <ColorButton type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {component.buttonText}
                </ColorButton>
              </form>
            </Box>
          </Collapse>
    )
  
  const ButtonNewUser = () => (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreate(!openCreate)}
      >
        Cadastrar Canal de Comunicação
      </Button>
      <Collapse in={openCreate} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <form onSubmit={handleCreate}>
          <TextField
                  name="canalCriar"
                  label="CanalComunicacao"
                  fullWidth
                />
            <ColorButton
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </ColorButton>
          </form>
        </Box>
      </Collapse>
    </>
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <BaseCollapsibleTable
        rows={comunicacao}
        columns={columns}
        CollapseComponent={CollapseComponent}
        ButtonNewUser={<ButtonNewUser />}
        ButtonAcoes={ButtonAcoes}
      />
    </Paper>
  );
}

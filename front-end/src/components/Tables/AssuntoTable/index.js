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
import AssuntoService from "../../../services/Assunto";

const columns = [
  { id: "assunto", label: "Assunto", minWidth: 170 },
  { id: "retroalimentacao", label: "Retroalimentação", minWidth: 170 },

];

function createData(id, assunto, retroalimentacao) {
  return {
    id, assunto, retroalimentacao
  };
}

export default function AssuntoTable() {
  const [assuntos, setAssunto] = React.useState([]);

  function handleDelete(id) {
    const result = confirm("Deseja realmente excluir o assunto?");
    if (result) {
      AssuntoService.delete(id, 'Assunto excluído com sucesso!', 'Erro ao excluir assunto!', () => window.location.reload())
    }
  }

  React.useEffect(() => {
    AssuntoService.getAssuntos().then((response) => {
      setAssunto(
        response.map((item) =>
          createData(
            item.id,
            item.assunto,
            item.retroalimentacao
          )
        )
      );
    });


  }, [setAssunto]);

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
      "Preencha os campos abaixo para cadastrar um novo coordenador de assunto",
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
    const data = { assunto: event.currentTarget.assuntoCriar.value };

    AssuntoService.registro(data, 'Assunto cadastrado com sucesso!',
      'Erro ao cadastrar assunto!', () => window.location.reload())
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { assunto: event.currentTarget.assunto.value, id };
    AssuntoService.registro(data, 'Assunto atualizado com sucesso!',
      'Erro ao atualizar assunto!', () => window.location.reload())

  };

  const CollapseComponent = (row, open) => (
      <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <form onSubmit={handleSubmit} key={row.assunto}>
                <TextField
                  name="assunto"
                  label="Assunto"
                  fullWidth
                  defaultValue={row.assunto}
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
        Cadastrar Assunto
      </Button>
      <Collapse in={openCreate} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <form onSubmit={handleCreate}>
            <TextField
              name="assuntoCriar"
              label="Nome do Assunto"
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
        rows={assuntos}
        columns={columns}
        CollapseComponent={CollapseComponent}
        ButtonNewUser={<ButtonNewUser />}
        ButtonAcoes={ButtonAcoes}
      />
    </Paper>
  );
}

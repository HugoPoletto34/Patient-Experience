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
import SetorService from "../../../services/Setor";

const columns = [
  { id: "nomeSetor", label: "Setor", minWidth: 170 },
  { id: "colaborador", label: "Coordenador", minWidth: 100 },
];

function createData(id, nomeSetor, colaborador) {
  return {
    id,
    nomeSetor,
    colaborador,
  };
}

const component = {
  buttonText: "Editar",
};

export default function SetorTable() {
  const [setores, setSetores] = React.useState([]);
  const [id, setId] = React.useState('');
  const [openCreate, setOpenCreate] = React.useState(false);

  
  function handleDelete(matricula) {
    const result = confirm("Deseja realmente excluir o setor?");
    if (result) {
      SetorService
      .delete(matricula, 'Setor excluído com sucesso!', 'Erro ao excluir setor!', () => window.location.reload())
    }
  }

  React.useEffect(() => {
    SetorService.getSetores().then((response) => {
      setSetores(
        response.map((item) =>
          createData(
            item.id,
            item.nomeSetor,
            item.colaborador != null
              ? item.colaborador.nome
              : "-"
          )
        )
      );
    });

  }, [setSetores]);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.white,
    backgroundColor: lightBlue[500],
    "&:hover": {
      backgroundColor: lightBlue[700],
    },
  }));

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { nomeSetor: event.currentTarget.nomeSetor.value, id };
    SetorService.registro(data, 'Setor atualizado com sucesso!', 'Erro ao atualizar setor!', () => window.location.reload());
  };

  const CollapseComponent = (row, open) => (
    <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <form onSubmit={handleSubmit} key={row.nomeSetor}>
              <TextField
                name="nomeSetor"
                label="Nome do Setor"
                fullWidth
                defaultValue={row.nomeSetor}
              />
              <ColorButton type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                {component.buttonText}
              </ColorButton>
            </form>
          </Box>
        </Collapse>
  )

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

  const handleCreate = (event) => {
    event.preventDefault();
    const data = { nomeSetor: event.currentTarget.nomeSetorCriar.value };

    SetorService.registro(data, 'Setor criado com sucesso!', 'Erro ao criar setor!', () => window.location.reload());

  };
  const ButtonNewUser = () => (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreate(!openCreate)}
      >
        Cadastrar Setor
      </Button>
      <Collapse in={openCreate} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <form onSubmit={handleCreate}>
            <TextField
              name="nomeSetorCriar"
              label="Nome do Setor"
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
        rows={setores}
        columns={columns}
        CollapseComponent={CollapseComponent}
        ButtonNewUser={<ButtonNewUser />}
        ButtonAcoes={ButtonAcoes}
      />
    </Paper>
  );
}

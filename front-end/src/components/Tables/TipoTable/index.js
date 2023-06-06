import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";
import BaseCollapsibleTable from "../BaseCollapsibleTable";
import { Box, Collapse, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TipoService from "../../../services/Tipo";

const columns = [
  { id: "tipo", label: "Tipo", minWidth: 170 },
  { id: "retroalimentacao", label: "Retroalimentação", minWidth: 170 }

];

function createData(id, tipo, retroalimentacao) {
  return {
    id, tipo, retroalimentacao
  };
}

export default function TipoTable() {
  const [tipos, setTipo] = React.useState([]);

  function handleDelete(id) {
    const result = confirm("Deseja realmente excluir o tipo?");
    if (result) {
      TipoService.delete(id, 'Tipo excluído com sucesso!', 'Erro ao excluir tipo!', () => window.location.reload())
    }
  }

  React.useEffect(() => {
    TipoService.getTipos().then((response) => {
      setTipo(
        response.map((item) =>
          createData(
            item.id,
            item.tipo,
            item.retroalimentacao
          )
        )
      );
    });

  }, [setTipo]);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.white,
    backgroundColor: lightBlue[500],
    "&:hover": {
      backgroundColor: lightBlue[700],
    },
  }));

  const component = {
    buttonText: "Editar",
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
    const data = { tipo: event.currentTarget.tipoCriar.value, retroalimentacao: event.currentTarget.retroalimentacaoCriar.value == "Sim"};
    TipoService.registro(data, 'Tipo cadastrado com sucesso!', 'Erro ao cadastrar tipo!', () => window.location.reload())
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { tipo: event.currentTarget.tipo.value, id, retroalimentacao: event.currentTarget.retroalimentacao.value == "Sim" };
    TipoService.registro(data, 'Tipo atualizado com sucesso!', 'Erro ao atualizar tipo!', () => window.location.reload())
  };

  const CollapseComponent = (row, open) => (
    <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <form onSubmit={handleSubmit} key={row.assunto} style={{display: "flex", flexDirection: "row", gap: '10px'}}>
              <TextField
                name="tipo"
                label="Tipo"
                fullWidth
                defaultValue={row.tipo}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Retroalimentação</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={row.retroalimentacao}
                  label="retroalimentacao"
                  name="retroalimentacao"
                >
                  <MenuItem value={"Sim"}>Sim</MenuItem>
                  <MenuItem value={"Não"}>Não</MenuItem>
                </Select>
              </FormControl>
              <ColorButton type="submit" variant="contained" >
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
        Cadastrar Tipo
      </Button>
      <Collapse in={openCreate} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
              <form onSubmit={handleCreate} style={{display: "flex", flexDirection: "row", gap: '10px'}}>
                <TextField
                  name="tipoCriar"
                  label="Tipo"
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Retroalimentação</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="retroalimentacao"
                    name="retroalimentacaoCriar"
                  >
                    <MenuItem value={"Sim"}>Sim</MenuItem>
                    <MenuItem value={"Não"}>Não</MenuItem>
                  </Select>
                </FormControl>
                <ColorButton type="submit" variant="contained" >
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
        rows={tipos}
        columns={columns}
        CollapseComponent={CollapseComponent}
        ButtonNewUser={<ButtonNewUser />}
        ButtonAcoes={ButtonAcoes}
      />
    </Paper>
  );
}

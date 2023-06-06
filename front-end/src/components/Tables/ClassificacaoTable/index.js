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
import ClassificacaoService from "../../../services/Classificacao";

const columns = [
  { id: "classificacao", label: "Classificação", minWidth: 170 },
  { id: "diasUteis", label: "Dias úteis", minWidth: 170 },
];

function createData(id, classificacao, diasUteis) {
  return {
    id, classificacao, diasUteis
  };
}

export default function ClassificacaoTable() {
  const [comunicacao, setClassificacao] = React.useState([]);

  function handleDelete(id) {
    const result = confirm("Deseja realmente excluir o classificacao?");
    if (result) {
      ClassificacaoService.delete(id, "Classificacao excluído com sucesso!", "Erro ao excluir classificacao!", () => window.location.reload());
    }
  }

  React.useEffect(() => {

    ClassificacaoService.getClassificacoes().then((response) => {
      setClassificacao(
        response.map((item) =>
          createData(
            item.id,
            item.classificacao,
            item.diasUteis
          )
        )
      );
    });
  }, [setClassificacao]);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.white,
    backgroundColor: lightBlue[500],
    "&:hover": {
      backgroundColor: lightBlue[700],
    },
  }));

  const component = {
    buttonText: "Editar",
    msgSucesso: "Cadastrado com sucesso!",
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
    const data = { classificacao: event.currentTarget.classificacaoCriar.value };
    ClassificacaoService.registro(data, "Classificação cadastrado com sucesso!", "Erro ao cadastrar classificacao!", () => window.location.reload());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { 
      classificacao: event.currentTarget.classificacao.value,
      diasUteis: event.currentTarget.diasUteis.value,
      id
    };
    ClassificacaoService.registro(data, "Classificação atualizado com sucesso", "Erro ao atualizar classificacao!", () => window.location.reload());
  };

  const CollapseComponent = (row, open) => (
      <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <form onSubmit={handleSubmit} key={row.classificacao}>
                <TextField
                  name="classificacao"
                  label="Classificação"
                  style={{ margin: 8 }}
                  defaultValue={row.classificacao}
                />
                <TextField
                  name="diasUteis"
                  label="Dias Úteis"
                  style={{ margin: 8 }}
                  defaultValue={row.diasUteis}
                />
                <ColorButton type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
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
        Cadastrar Classificação
      </Button>
      <Collapse in={openCreate} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <form onSubmit={handleCreate}>
            <TextField
              name="classificacaoCriar"
              label="Nome do Classificação"
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

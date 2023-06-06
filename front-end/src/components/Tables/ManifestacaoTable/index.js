import * as React from "react";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import { TableContainer } from "../../Layout/Containers";
import ManifestacaoService from "../../../services/Manifestacao";



export default function ManifestacaoTable() {
  const navigate = useNavigate();
  const [manifestacoes, setManifestacoes] = React.useState([]);

  function handleView(id) {
    navigate(`/visualizar/manifestacao/${id}`);
  }

  function handleEdit(id) {
    navigate(`/cadastro/manifestacao/${id}`);
  }

  function handleDelete(id) {
    const result = confirm("Deseja realmente excluir a manifestação?");
    if (result) {
      ManifestacaoService.delete(id, 
        'Manifestação excluída com sucesso!', 
        'Erro ao excluir manifestação!', 
        () => window.location.reload())

    }
  }

  const columnsGrid = [
    {
      field: "paciente",
      headerName: "Nome do Paciente",
      width: 200,
    },
    { field: "assunto", headerName: "Assunto", width: 400 },
    { field: "tipo", headerName: "Tipo", width: 200 },
    { field: "setor", headerName: "Setor", width: 200 },
    {
      field: "id",
      headerName: "Ações",
      width: 150,
      renderCell: (props) => {
        const { value } = props;
  
        return (
          <>
            <ButtonGroup
              disableRipple
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button size="small" color="info" onClick={() => handleView(value)}>
                <VisibilityIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => handleEdit(value)}
              >
                <EditIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(value)}
              >
                <DeleteIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </>
        );
      },
    },
  ];

  function handleNewUser() {
    navigate(`/cadastro/manifestacao`);
  }

  useEffect(() => {
    ManifestacaoService.getManifestacoes().then((response) => {
      setManifestacoes(response);
    });
  }, []);

  const ButtonNewUser = () => (
    <Button color="success" variant="contained" onClick={handleNewUser}>
      Registrar nova Manifestação
    </Button>
  );

  return (
    <>
      <TableContainer>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              rows={manifestacoes}
              columns={columnsGrid}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Paper>
        <ButtonNewUser />
      </TableContainer>
    </>
  );
}

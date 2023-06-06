import * as React from "react";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import { TableContainer } from "../../Layout/Containers";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import UsuarioService from "../../../services/Usuario";



export default function CoordenadorTable() {
  const navigate = useNavigate();
  const [coordenadores, setCoordenadores] = React.useState([]);

  // function handleView(matricula) {
  //   navigate(`/visualizar/usuario/${matricula}`);
  // }

  function handleEdit(matricula) {
    navigate(`/cadastro/usuario/${matricula}`);
  }

  function handleDelete(matricula) {
    const result = confirm("Deseja realmente excluir o colaborador?");
    if (result) {
      UsuarioService.delete(matricula, "Colaborador excluído com sucesso!", "Erro ao excluir colaborador!", () => window.location.reload());
    }
  }

  const columnsGrid = [
    {
      field: "matricula",
      headerName: "Matricula",
      width: 170,
    },
    { field: "nome", headerName: "Nome", width: 250 },
    { field: "email", headerName: "E-mail", width: 170 },
    { field: "perfil", headerName: "Perfil", width: 170 },
    { field: "setor", headerName: "Setor", width: 170 },
    {
      field: "acoes",
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
              {/* <Button
                size="small"
                color="info"
                onClick={() => handleView(value.matricula)}
              >
                <VisibilityIcon fontSize="small" />
              </Button> */}
              <Button
                size="small"
                color="primary"
                onClick={() => handleEdit(value.matricula)}
              >
                <EditIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(value.id)}
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
    navigate(`/cadastro/usuario`);
  }

  useEffect(() => {
    UsuarioService.getUsuarios().then((res) => {
      const users = res.map((user) => {
        return { ...user, acoes: { matricula: user.matricula, id: user.id } };
      });
      setCoordenadores(users);
    });
  }, [setCoordenadores]);

  const ButtonNewUser = () => (
    <Button color="success" variant="contained" onClick={handleNewUser}>
      Criar novo Usuário
    </Button>
  );

  return (
    <>
      <TableContainer>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              rows={coordenadores}
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

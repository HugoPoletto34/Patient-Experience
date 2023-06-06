


import * as React from 'react';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';

import BaseTable from '../BaseTable';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getSetor } from '../../services/auth';

import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from 'react-router-dom';
import ManifestacaoService from '../../../services/Manifestacao';
import ClassificacaoService from '../../../services/Classificacao';



const columns = [
  { id: 'dataInicioManifestacao', label: 'Data da Manifestação', minWidth: 100 },
  { id: 'paciente', label: 'Nome do Paciente', minWidth: 170 },
  { id: 'assunto', label: 'Assunto', minWidth: 100 },
  { id: 'tipo', label: 'Tipo', minWidth: 100 },
  { id: 'classificacao', label: 'Classificação', minWidth: 100 },
  { id: 'relato', label: 'Relato', minWidth: 100 },
  { id: 'ativo', label: 'Ativo', minWidth: 100 },


];


export default function ManifestacaoBySetorTable() {
  const navigate = useNavigate();
  const [manifestacoes, setManifestacoes] = React.useState([]);
  const [manifestacoesFilter, setManifestacoesFilter] = React.useState([]);
  const [classificacoes, setClassificacoes] = React.useState([]);
  const [classificacao, setClassificacao] = React.useState('');
  const result = getSetor();
  const handleChange = (event) => {
    setClassificacao(event.target.value);
    setManifestacoesFilter(manifestacoes.filter((manifestacao) => manifestacao.classificacao == event.target.value));
  };

  useEffect(() => {
    ClassificacaoService.getClassificacoes().then((response) => {
      setClassificacoes(response)
    })
    ManifestacaoService.getManifestacaoBySetor(result)
    .then((response) => {
      setManifestacoes(response); 
      setManifestacoesFilter(response)
    })

  }, [setManifestacoes]); 


  const ButtonAcoes = (row) => (
    <Button color="success" variant="outlined" onClick={() => {navigate(`/manifestacao/${row?.id}/resposta`)}}>
      <VisibilityIcon fontSize="small"  />
      
    </Button>
  );


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: 1 }}>
      <FormControl style={{ width: 300 }}>
        <InputLabel id="demo-simple-select-label">Filtrar por Classificação</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={classificacao}
          label="Classificação"
          onChange={handleChange}
        >
          {classificacoes.map((classificacao) => (
            <MenuItem key={classificacao.id} value={classificacao.classificacao}>{classificacao.classificacao}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <BaseTable
        rows={manifestacoesFilter}
        columns={columns}
        ButtonAcoes={ButtonAcoes}
        ButtonNewUser={null}
      />
    </Paper>
  );
}

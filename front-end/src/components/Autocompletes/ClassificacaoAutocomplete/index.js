import { Autocomplete, TextField } from "@mui/material";
import api from "../../services/api";
import { useState, useEffect } from 'react'

export default function ClassificacaoAutocomplete({ formInput, setFormInput, setDiasUteis, handleInputValue }) {
  const [inputValue, setInputValue] = useState('');

  const [ classificacoes, setclassificacoes ] = useState([]);

  useEffect(() => {
    function fetchSetores() {
      // You can await here
      api
      .get("/classificacao/listar")
      .then((response) => {
        const res = [];
        response.data.forEach((classificacao) => {
          res.push({label: classificacao.classificacao, diasUteis: classificacao.diasUteis});
        });
        setclassificacoes(res);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

      
    }

    fetchSetores();
  }, []);

  return (
    <Autocomplete
            value={formInput.classificacao.classificacao}
            onChange={(event, newValue) => {
              setDiasUteis(newValue.diasUteis);
              setFormInput({ classificacao: {classificacao: newValue.label} });
              handleInputValue(newValue.label)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="combo-box-demo"
            options={classificacoes}
            renderInput={(params) => <TextField {...params} label="Classificação" />}
          />
  )
}
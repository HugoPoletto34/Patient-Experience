import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CanalComunicacaoAutocomplete({ value, handleChange }) {
  const [inputValue, setInputValue] = useState('');

  const [ canais, setCanais ] = useState([]);

  useEffect(() => {
    function fetchSetores() {
      // You can await here
      api
      .get("/canalComunicacao/listar")
      .then((response) => {
        const res = [""];
        response.data.forEach((canalComunicacao) => {
          res.push(canalComunicacao.canal);
        });
        setCanais(res);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

      
    }

    fetchSetores();
  }, []);

  return (
    <Autocomplete
            value={value}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="combo-box-demo"
            options={canais}
            renderInput={(params) => <TextField {...params} label="Canal de comunicação" />}
          />
  )
}
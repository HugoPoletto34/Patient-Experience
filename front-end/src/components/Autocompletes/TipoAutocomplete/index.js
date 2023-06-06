import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function TipoAutocomplete({ formInput, setFormInput }) {
  const [inputValue, setInputValue] = useState('');

  const [ tipos, setTipos ] = useState([]);

  useEffect(() => {
    function fetchSetores() {
      // You can await here
      api
      .get("/tipo/listar")
      .then((response) => {
        const res = [""];
        response.data.forEach((tipo) => {
          res.push(tipo.tipo);
        });
        setTipos(res);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

      
    }

    fetchSetores();
  }, []);

  return (
    <Autocomplete
            value={formInput.tipo.tipo}
            onChange={(event, newValue) => {
              setFormInput({ tipo: {tipo: newValue} });
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="combo-box-demo"
            options={tipos}
            renderInput={(params) => <TextField {...params} label="Tipo" />}
          />
  )
}
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function LeitoAutocomplete({ formInput, setFormInput }) {
  const [inputValue, setInputValue] = useState('');

  const [ leitos, setLeitos ] = useState([]);

  useEffect(() => {
    function fetchSetores() {
      // You can await here
      api
      .get("/leito/listar")
      .then((response) => {
        const res = [""];
        response.data.forEach((leito) => {
          res.push(leito.leito);
        });
        setLeitos(res);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

      
    }

    fetchSetores();
  }, []);

  return (
    <Autocomplete
            value={formInput.leito.leito}
            onChange={(event, newValue) => {
              setFormInput({ leito: {leito: newValue} });
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            fullWidth
            id="combo-box-demo"
            options={leitos}
            renderInput={(params) => <TextField {...params} label="Leito" />}
          />
  )
}
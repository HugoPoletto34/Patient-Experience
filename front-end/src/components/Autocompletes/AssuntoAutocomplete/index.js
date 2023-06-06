import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AssuntoAutocomplete({ formInput, setFormInput }) {
  const [inputValue, setInputValue] = useState('');

  const [ assuntos, setAssuntos ] = useState([]);

  useEffect(() => {
    function fetchSetores() {
      // You can await here
      api
      .get("/assunto/listar")
      .then((response) => {
        const res = [""];
        response.data.forEach((assunto) => {
          res.push(assunto.assunto);
        });
        setAssuntos(res);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

      
    }

    fetchSetores();
  }, []);

  return (
    <Autocomplete
            value={formInput.assunto.assunto}
            onChange={(event, newValue) => {
              setFormInput({ assunto: {assunto: newValue} });
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="combo-box-demo"
            options={assuntos}
            renderInput={(params) => <TextField {...params} label="Assunto" />}
          />
  )
}
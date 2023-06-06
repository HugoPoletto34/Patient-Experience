import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SetorAutocomplete({ formInput, setFormInput }) {
  const [inputValue, setInputValue] = useState('');

  const [ setores, setSetores ] = useState([]);

  useEffect(() => {
    function fetchSetores() {
      // You can await here
      api
      .get("/setor/listar")
      .then((response) => {
        const res = [""];
        response.data.forEach((setor) => {
          res.push(setor.nomeSetor);
        });
        setSetores(res);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

      
    }

    fetchSetores();
  }, []);

  return (
    <Autocomplete
            value={formInput.setor.nomeSetor}
            onChange={(event, newValue) => {
              setFormInput({ setor: {nomeSetor: newValue} });
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="combo-box-demo"
            options={setores}
            renderInput={(params) => <TextField {...params} label="Setor" />}
          />
  )
}
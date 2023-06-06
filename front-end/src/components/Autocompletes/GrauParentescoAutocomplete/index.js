import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function GrauParentescoAutocomplete({ formInput, setFormInput }) {
  const [inputValue, setInputValue] = useState('');

  const [ grausParentesco, setGrausParentesco ] = useState([]);

  useEffect(() => {
    function fetchSetores() {
      // You can await here
      api
      .get("/parentesco/listar")
      .then((response) => {
        const res = [""];
        response.data.forEach((grauParentesco) => {
          res.push(grauParentesco.grauParentesco);
        });
        setGrausParentesco(res);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

      
    }

    fetchSetores();
  }, []);

  return (
    <Autocomplete
            value={formInput.grauParentesco.grauParentesco}
            onChange={(event, newValue) => {
              setFormInput({ grauParentesco: {grauParentesco: newValue} });
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="combo-box-demo"
            options={grausParentesco}
            renderInput={(params) => <TextField {...params} label="Grau de Parentesco" />}
          />
  )
}
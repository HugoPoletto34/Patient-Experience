package com.fhsfa.cxs.controllers;

import com.fhsfa.cxs.dto.Request.ColaboradorRequestDTO;
import com.fhsfa.cxs.dto.Response.SetorResponseDTO;
import com.fhsfa.cxs.entities.Setor;
import com.fhsfa.cxs.services.ColaboradorService;
import com.fhsfa.cxs.services.SetorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/setor")
public class SetorController {
    @Autowired
    private SetorService service;

    @GetMapping(value = "/listar")
    public ResponseEntity listarSetor(){
        List<SetorResponseDTO> list = service.findAll();
        if (list.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhum colaborador encontrado.");
        return ResponseEntity.ok().body(list);
    }


    @PostMapping (value = "/cadastrar")
    public ResponseEntity insert (@RequestBody Setor dto) {
        ResponseEntity re = service.insert(dto);
        return re;
    }


    @DeleteMapping  (value = "/deletar/id/{id}")
    public void  delete (@PathVariable Long id) {
        service.deleteById(id);
    }
}

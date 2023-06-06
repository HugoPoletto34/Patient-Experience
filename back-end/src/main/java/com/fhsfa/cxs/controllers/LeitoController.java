package com.fhsfa.cxs.controllers;

import com.fhsfa.cxs.entities.Leito;
import com.fhsfa.cxs.services.LeitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/leito")
public class LeitoController {
    @Autowired
    private LeitoService service;

    @GetMapping(value = "/listar")
    public ResponseEntity listarLeito(){
        List<Leito> list = service.findAll();
        if (list.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhum colaborador encontrado.");
        return ResponseEntity.ok().body(list);
    }


    @PostMapping (value = "/cadastrar")
    public ResponseEntity insert (@RequestBody Leito dto) {
        ResponseEntity re = service.insert(dto);
        return re;
    }

    @DeleteMapping  (value = "/deletar/id/{id}")
    public void  delete (@PathVariable Long id) {
        service.deleteById(id);
    }
}

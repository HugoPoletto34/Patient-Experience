package com.fhsfa.cxs.controllers;

import com.fhsfa.cxs.entities.GrauParentesco;
import com.fhsfa.cxs.services.GrauParentescoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/parentesco")
public class GrauParentescoController {
    @Autowired
    private GrauParentescoService service;

    @GetMapping(value = "/listar")
    public ResponseEntity listarGrauParentesco(){
        List<GrauParentesco> list = service.findAll();
        if (list.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhum colaborador encontrado.");
        return ResponseEntity.ok().body(list);
    }


    @PostMapping (value = "/cadastrar")
    public ResponseEntity insert (@RequestBody GrauParentesco dto) {
        ResponseEntity re = service.insert(dto);
        return re;
    }

    @DeleteMapping  (value = "/deletar/id/{id}")
    public void  delete (@PathVariable Long id) {
        service.deleteById(id);
    }
}

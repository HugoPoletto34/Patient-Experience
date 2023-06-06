package com.fhsfa.cxs.controllers;

import com.fhsfa.cxs.entities.Classificacao;
import com.fhsfa.cxs.services.ClassificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/classificacao")
public class ClassificacaoController {
    @Autowired
    private ClassificacaoService service;

    @GetMapping(value = "/listar")
    public ResponseEntity listarClassificacao(){
        List<Classificacao> list = service.findAll();
        if (list.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhum colaborador encontrado.");
        return ResponseEntity.ok().body(list);
    }


    @PostMapping (value = "/cadastrar")
    public ResponseEntity insert (@RequestBody Classificacao dto) {
        ResponseEntity re = service.insert(dto);
        return re;
    }

    @DeleteMapping  (value = "/deletar/id/{id}")
    public void  delete (@PathVariable Long id) {
        service.deleteById(id);
    }
}

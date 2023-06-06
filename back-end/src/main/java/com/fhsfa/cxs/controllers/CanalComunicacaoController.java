package com.fhsfa.cxs.controllers;

import com.fhsfa.cxs.entities.CanalComunicacao;
import com.fhsfa.cxs.services.CanalComunicacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/canalComunicacao")
public class CanalComunicacaoController {
    @Autowired
    private CanalComunicacaoService service;

    @GetMapping(value = "/listar")
    public ResponseEntity listarCanaisComunicacao(){
        List<CanalComunicacao> list = service.findAll();
        if (list.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhum colaborador encontrado.");
        return ResponseEntity.ok().body(list);
    }


    @PostMapping (value = "/cadastrar")
    public ResponseEntity insert (@RequestBody CanalComunicacao dto) {
        ResponseEntity re = service.insert(dto);
        return re;
    }

    @DeleteMapping  (value = "/deletar/id/{id}")
    public void  delete (@PathVariable Long id) {
        service.deleteById(id);
    }
}

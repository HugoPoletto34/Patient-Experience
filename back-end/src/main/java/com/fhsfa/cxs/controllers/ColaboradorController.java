package com.fhsfa.cxs.controllers;

import com.fhsfa.cxs.dto.Request.ColaboradorRequestDTO;
import com.fhsfa.cxs.dto.Request.ResetPasswordRequestDTO;
import com.fhsfa.cxs.dto.Response.ColaboradorResponseDTO;
import com.fhsfa.cxs.entities.Colaborador;
import com.fhsfa.cxs.services.ColaboradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/colaborador")
public class ColaboradorController {
    @Autowired
    private ColaboradorService service;

    @GetMapping(value = "/listar")
    public ResponseEntity listarColaborador(){
        List<ColaboradorResponseDTO> list = service.findAll();
        if (list.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhum colaborador encontrado.");
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/mostrar/id/{id}")
    public ResponseEntity showColaboradorById(@PathVariable Long id) {
        ResponseEntity respColaborador = service.getById(id);
        return respColaborador;
    }

    @GetMapping(value = "/{matricula}")
    public ResponseEntity showColaboradorByMatricula(@PathVariable Long matricula) {
        ResponseEntity respColaborador = service.getByMatricula(matricula);
        return respColaborador;
    }

    @GetMapping(value = "/mostrar/nome/{name}")
    public ResponseEntity showColaboradorByName(@PathVariable String name) {
        ResponseEntity respColaborador = service.getByName(name);
        return respColaborador;
    }

    @GetMapping(value = "/validate-colaborador/{code}")
    public ResponseEntity<ColaboradorResponseDTO> validateColaborador(@PathVariable String code) {
        ResponseEntity<ColaboradorResponseDTO> respColaborador = service.validateColaborador(code);
        return respColaborador;
    }

    @PatchMapping (value = "/reset-password")
    public ResponseEntity resetpassword (@RequestBody ResetPasswordRequestDTO dto) {
        ResponseEntity re = service.updateSenha(dto);
        return re;
    }

    @PostMapping (value = "/first-access/{code}")
    public ResponseEntity firstAccess (@PathVariable String code, @RequestBody ResetPasswordRequestDTO dto) {
        ResponseEntity re = service.firstAccess(code, dto);
        return re;
    }

    @PostMapping (value = "/cadastrar")
    public ResponseEntity insert (@RequestBody ColaboradorRequestDTO dto) {

        ResponseEntity re = service.insert(dto);
        return re;
    }

    @DeleteMapping  (value = "/deletar/id/{id}")
    public void  delete (@PathVariable Long id) {
        service.deleteById(id);
    }

    @DeleteMapping  (value = "/{matricula}")
    public void  deleteMatricula (@PathVariable Long matricula) {
        service.deleteByMatricula(matricula);
    }
}

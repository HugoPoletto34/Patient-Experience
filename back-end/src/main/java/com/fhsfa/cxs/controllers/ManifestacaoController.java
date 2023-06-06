package com.fhsfa.cxs.controllers;

import com.fhsfa.cxs.dto.Request.ManifestacaoRequestDTO;
import com.fhsfa.cxs.dto.Request.RespostaManifestacaoDTO;
import com.fhsfa.cxs.dto.Response.GetManifestacaoResponseTableDTO;
import com.fhsfa.cxs.dto.Response.ManifestacaoResponseDTO;
import com.fhsfa.cxs.entities.Classificacao;
import com.fhsfa.cxs.services.ManifestacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/manifestacao")
public class ManifestacaoController {
    @Autowired
    private ManifestacaoService service;



    @GetMapping(value = "/listar")
    public ResponseEntity findAll(){
        List<ManifestacaoResponseDTO> objList = service.findAll();
        if(objList.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhuma manifestacao encontrada");
        return ResponseEntity.ok().body(objList);
    }
    @GetMapping(value = "/listar/table")
    public ResponseEntity findAllToTable(){
        List<GetManifestacaoResponseTableDTO> objList = service.findAllToTable();
        if(objList.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhuma manifestacao encontrada");
        return ResponseEntity.ok().body(objList);
    }

    @GetMapping(value = "/listar/setor/{setor}")
    public ResponseEntity findAllBySetor(@PathVariable String setor){
        List<GetManifestacaoResponseTableDTO> objList = service.findAllBySetor(setor).stream().map(GetManifestacaoResponseTableDTO::new).collect(Collectors.toList());
        if(objList.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhuma manifestacao encontrada");
        return ResponseEntity.ok().body(objList);
    }

    @GetMapping(value = "/mostrar/id/{id}")
    public ResponseEntity<ManifestacaoResponseDTO> findById(@PathVariable Long id){
        ManifestacaoResponseDTO obj = new ManifestacaoResponseDTO(service.getById(id));
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping(value = "/mostrar/table/id/{id}")
    public ResponseEntity<GetManifestacaoResponseTableDTO> findByIdToTable(@PathVariable Long id){
        GetManifestacaoResponseTableDTO obj = new GetManifestacaoResponseTableDTO(service.getById(id));
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping(value = "/mostrar/proximo-dia-util")
    public ResponseEntity<String> findByIdToTable(@RequestParam("dataInicio") String dataInicio, @RequestParam("diasUteis") int diasUteis) {

        String obj = service.nextBusinessDay(dataInicio, diasUteis);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping(value = "/cadastrar")
    public ResponseEntity insert (@RequestBody ManifestacaoRequestDTO dto){
        ResponseEntity resp = service.insert(dto);
        return resp;
    }

    @PostMapping(value = "/{id}/registrar-resposta")
    public ResponseEntity insertResposta (@RequestBody RespostaManifestacaoDTO dto, @PathVariable Long id){
        ResponseEntity resp = service.insertResposta(id, dto);
        return resp;
    }

    @DeleteMapping(value="/deletar/id/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

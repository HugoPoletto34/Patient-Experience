package com.fhsfa.cxs.services;

import com.fhsfa.cxs.dto.Response.ManifestacaoResponseDTO;
import com.fhsfa.cxs.dto.Response.SetorResponseDTO;
import com.fhsfa.cxs.entities.Setor;
import com.fhsfa.cxs.repositories.SetorRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SetorService {

    @Autowired
    private SetorRepository setorRepository;


    @Transactional
    public List<SetorResponseDTO> findAll(){
        List<Setor> listResponse = setorRepository.findAll().stream().sorted(Comparator.comparing(Setor::getId)).collect(Collectors.toList());
        return listResponse.stream().map(obj -> new SetorResponseDTO(obj)).collect(Collectors.toList());
    }

    @Transactional
    public Setor getById(Long id){
        Optional<Setor> obj = setorRepository.findById(id);
        return obj.orElseThrow(()-> new ObjectNotFoundException(1,
                "Manifestação não encontrada. Id: " + id));
    }

    @Transactional
    public ResponseEntity<Setor> insert(Setor objDTO){
        Setor obj = setorRepository.save(objDTO);
        return ResponseEntity.status(201).body(obj);
    }

    @Transactional
    public void deleteById(Long id){
        getById(id);
        try{
            setorRepository.deleteById(id);
        }catch(DataIntegrityViolationException e){
            throw new DataIntegrityViolationException("Não foi possivel excluir esta manifestação.");
        }
    }
}

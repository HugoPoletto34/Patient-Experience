package com.fhsfa.cxs.services;

import com.fhsfa.cxs.entities.CanalComunicacao;
import com.fhsfa.cxs.repositories.CanalComunicacaoRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CanalComunicacaoService {

    @Autowired
    private CanalComunicacaoRepository setorRepository;


    @Transactional
    public List<CanalComunicacao> findAll(){
        List<CanalComunicacao> listResponse = setorRepository.findAll();
        return listResponse;
    }

    @Transactional
    public CanalComunicacao getById(Long id){
        Optional<CanalComunicacao> obj = setorRepository.findById(id);
        return obj.orElseThrow(()-> new ObjectNotFoundException(1,
                "Manifestação não encontrada. Id: " + id));
    }

    @Transactional
    public ResponseEntity<CanalComunicacao> insert(CanalComunicacao objDTO){
        CanalComunicacao obj = setorRepository.save(objDTO);
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

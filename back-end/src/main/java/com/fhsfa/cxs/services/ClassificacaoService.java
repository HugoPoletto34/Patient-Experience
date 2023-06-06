package com.fhsfa.cxs.services;

import com.fhsfa.cxs.entities.Classificacao;
import com.fhsfa.cxs.repositories.ClassificacaoRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ClassificacaoService {

    @Autowired
    private ClassificacaoRepository setorRepository;


    @Transactional
    public List<Classificacao> findAll(){
        List<Classificacao> listResponse = setorRepository.findAll();
        return listResponse;
    }

    @Transactional
    public Classificacao getById(Long id){
        Optional<Classificacao> obj = setorRepository.findById(id);
        return obj.orElseThrow(()-> new ObjectNotFoundException(1,
                "Manifestação não encontrada. Id: " + id));
    }

    @Transactional
    public ResponseEntity<Classificacao> insert(Classificacao objDTO){
        Classificacao obj = setorRepository.save(objDTO);
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

package com.fhsfa.cxs.services;

import com.fhsfa.cxs.entities.Assunto;
import com.fhsfa.cxs.repositories.AssuntoRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class AssuntoService {

    @Autowired
    private AssuntoRepository setorRepository;


    @Transactional
    public List<Assunto> findAll(){
        List<Assunto> listResponse = setorRepository.findAll();
        return listResponse;
    }

    @Transactional
    public Assunto getById(Long id){
        Optional<Assunto> obj = setorRepository.findById(id);
        return obj.orElseThrow(()-> new ObjectNotFoundException(1,
                "Manifestação não encontrada. Id: " + id));
    }

    @Transactional
    public ResponseEntity<Assunto> insert(Assunto objDTO){
        Assunto obj = setorRepository.save(objDTO);
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

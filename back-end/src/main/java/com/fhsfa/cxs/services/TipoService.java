package com.fhsfa.cxs.services;

import com.fhsfa.cxs.entities.Tipo;
import com.fhsfa.cxs.repositories.TipoRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class TipoService {

    @Autowired
    private TipoRepository setorRepository;


    @Transactional
    public List<Tipo> findAll(){
        List<Tipo> listResponse = setorRepository.findAll();
        return listResponse;
    }

    @Transactional
    public Tipo getById(Long id){
        Optional<Tipo> obj = setorRepository.findById(id);
        return obj.orElseThrow(()-> new ObjectNotFoundException(1,
                "Manifestação não encontrada. Id: " + id));
    }

    @Transactional
    public ResponseEntity<Tipo> insert(Tipo objDTO){
        Tipo obj = setorRepository.save(objDTO);
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

package com.fhsfa.cxs.services;

import com.fhsfa.cxs.entities.Leito;
import com.fhsfa.cxs.repositories.LeitoRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class LeitoService {

    @Autowired
    private LeitoRepository setorRepository;


    @Transactional
    public List<Leito> findAll(){
        List<Leito> listResponse = setorRepository.findAll();
        return listResponse;
    }

    @Transactional
    public Leito getById(Long id){
        Optional<Leito> obj = setorRepository.findById(id);
        return obj.orElseThrow(()-> new ObjectNotFoundException(1,
                "Manifestação não encontrada. Id: " + id));
    }

    @Transactional
    public ResponseEntity<Leito> insert(Leito objDTO){
        Leito obj = setorRepository.save(objDTO);
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

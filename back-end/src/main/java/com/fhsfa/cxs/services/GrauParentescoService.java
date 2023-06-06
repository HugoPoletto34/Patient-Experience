package com.fhsfa.cxs.services;

import com.fhsfa.cxs.entities.GrauParentesco;
import com.fhsfa.cxs.repositories.GrauParentescoRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class GrauParentescoService {

    @Autowired
    private GrauParentescoRepository setorRepository;


    @Transactional
    public List<GrauParentesco> findAll(){
        List<GrauParentesco> listResponse = setorRepository.findAll();
        return listResponse;
    }

    @Transactional
    public GrauParentesco getById(Long id){
        Optional<GrauParentesco> obj = setorRepository.findById(id);
        return obj.orElseThrow(()-> new ObjectNotFoundException(1,
                "Manifestação não encontrada. Id: " + id));
    }

    @Transactional
    public ResponseEntity<GrauParentesco> insert(GrauParentesco objDTO){
        GrauParentesco obj = setorRepository.save(objDTO);
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

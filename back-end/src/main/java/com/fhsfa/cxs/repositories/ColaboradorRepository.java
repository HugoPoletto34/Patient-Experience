package com.fhsfa.cxs.repositories;

import com.fhsfa.cxs.entities.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.NamedNativeQuery;
import javax.transaction.Transactional;
import java.lang.annotation.Native;


public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {


    @Transactional
    Colaborador findByEmail(String email);

    @Query("SELECT c\n" +
             "FROM Colaborador c\n" +
             "WHERE c.matricula = :matricula\n")
    Colaborador getByMatricula(@Param(value = "matricula") Long matricula);

    @Query ("SELECT c \n" +
            "FROM Colaborador c\n" +
            "WHERE c.nome = :nome\n")
    Colaborador getByNome(@Param(value = "nome") String nome);

    @Query ("SELECT c \n" +
            "FROM Colaborador c\n" +
            "WHERE c.id = :id\n")
    Colaborador getById(@Param(value = "id") Long id);
    @Query ("DELETE \n" +
            "FROM Colaborador c\n" +
            "WHERE c.matricula = :matricula\n")
    void deleteByMatricula(Long matricula);

}

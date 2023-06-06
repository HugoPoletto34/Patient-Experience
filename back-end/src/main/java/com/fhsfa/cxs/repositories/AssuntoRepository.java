package com.fhsfa.cxs.repositories;

import com.fhsfa.cxs.entities.Setor;
import com.fhsfa.cxs.entities.Assunto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AssuntoRepository extends JpaRepository<Assunto, Long> {

    @Query("SELECT s\n" +
            "FROM Assunto s\n" +
            "WHERE s.assunto = :assunto\n")
    Assunto getByAssunto(String assunto);
}

package com.fhsfa.cxs.repositories;

import com.fhsfa.cxs.entities.CanalComunicacao;
import com.fhsfa.cxs.entities.Setor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CanalComunicacaoRepository extends JpaRepository<CanalComunicacao, Long> {

    @Query("SELECT s\n" +
            "FROM CanalComunicacao s\n" +
            "WHERE s.canal = :canal\n")
    CanalComunicacao getByCanal(String canal);
}

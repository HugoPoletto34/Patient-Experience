package com.fhsfa.cxs.repositories;

import com.fhsfa.cxs.entities.CanalComunicacao;
import com.fhsfa.cxs.entities.Classificacao;
import com.fhsfa.cxs.entities.Setor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassificacaoRepository extends JpaRepository<Classificacao, Long> {

    @Query("SELECT s\n" +
            "FROM Classificacao s\n" +
            "WHERE s.classificacao = :classificacao\n")
    Classificacao getByClassificacao(String classificacao);
}

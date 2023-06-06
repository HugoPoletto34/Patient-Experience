package com.fhsfa.cxs.repositories;

import com.fhsfa.cxs.entities.Manifestacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManifestacaoRepository extends JpaRepository<Manifestacao, Long> {
    @Query("SELECT m\n" +
            "FROM Manifestacao m\n" +
            "WHERE m.setor.nomeSetor = :setor\n")
    List<Manifestacao> findAllBySetor(String setor);
}

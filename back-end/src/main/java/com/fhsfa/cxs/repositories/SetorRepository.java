package com.fhsfa.cxs.repositories;

import com.fhsfa.cxs.entities.Manifestacao;
import com.fhsfa.cxs.entities.Setor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SetorRepository extends JpaRepository<Setor, Long> {

    @Query("SELECT s\n" +
            "FROM Setor s\n" +
            "WHERE s.nomeSetor = :setor\n")
    Setor getBySetorName(String setor);
}

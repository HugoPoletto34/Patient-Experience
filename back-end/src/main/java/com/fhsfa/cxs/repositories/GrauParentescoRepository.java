package com.fhsfa.cxs.repositories;

import com.fhsfa.cxs.entities.GrauParentesco;
import com.fhsfa.cxs.entities.Setor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GrauParentescoRepository extends JpaRepository<GrauParentesco, Long> {

    @Query("SELECT s\n" +
            "FROM GrauParentesco s\n" +
            "WHERE s.grauParentesco = :grauParentesco\n")
    GrauParentesco getByGrauParentesco(String grauParentesco);
}

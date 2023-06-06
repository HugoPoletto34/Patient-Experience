package com.fhsfa.cxs.repositories;

import com.fhsfa.cxs.entities.Tipo;
import com.fhsfa.cxs.entities.Setor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoRepository extends JpaRepository<Tipo, Long> {

    @Query("SELECT s\n" +
            "FROM Tipo s\n" +
            "WHERE s.tipo = :tipo\n")
    Tipo getByTipo(String tipo);
}

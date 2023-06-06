package com.fhsfa.cxs.repositories;

import com.fhsfa.cxs.entities.Leito;
import com.fhsfa.cxs.entities.Setor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LeitoRepository extends JpaRepository<Leito, Long> {

    @Query("SELECT s\n" +
            "FROM Leito s\n" +
            "WHERE s.leito = :leito\n")
    Leito getByLeito(String leito);
}

package com.fhsfa.cxs.repositories;

import com.fhsfa.cxs.entities.Manifestacao;
import com.fhsfa.cxs.entities.RespostaSetor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RespostaManifestacaoRepository extends JpaRepository<RespostaSetor, Long> {

}

package com.fhsfa.cxs.entities;

import com.fhsfa.cxs.entities.enums.CumprimentoPrazo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RespostaSetor implements Serializable {
    private static final long serialVersionUID = 9188576132L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataResposta;

    private String resposta;

    @Column(name = "observacao")
    private String observacao;

    @Enumerated(EnumType.STRING)
    private CumprimentoPrazo cumprimentoPrazo;

    public RespostaSetor(String respostaSetor) {
        this.resposta = respostaSetor;
    }
}

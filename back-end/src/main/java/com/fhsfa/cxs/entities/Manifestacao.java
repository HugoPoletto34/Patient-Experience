package com.fhsfa.cxs.entities;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Manifestacao implements Serializable {
    private static final long serialVersionUID = 9188576132L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String paciente;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="canal_comunicacao_id", nullable=false)
    private CanalComunicacao canalComunicacao;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="setor_id", nullable=false)
    private Setor setor;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="assunto_id", nullable=false)
    private Assunto assunto;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="tipo_id", nullable=false)
    private Tipo tipo;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="leito_id", nullable=false)
    private Leito leito;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="grau_parentesco_id", nullable=false)
    private GrauParentesco grauParentesco;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="classificacao_id", nullable=false)
    private Classificacao classificacao;

    private String contato;
    private String relato;
    @Column(name = "data_inicio_manifestacao")
    private LocalDate dataInicioManifestacao;
    @Column(name = "data_final_manifestacao")
    private LocalDate dataFinalManifestacao;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="resposta_setor_id")
    private RespostaSetor respostaSetor;

    private boolean ativo;

    @Override
    public String toString() {
        return "Manifestacao{" +
                "id=" + id +
                ", paciente='" + paciente + '\'' +
                ", canalComunicacao=" + canalComunicacao +
                ", setor=" + setor +
                ", assunto=" + assunto +
                ", tipo=" + tipo +
                ", leito=" + leito +
                ", contato='" + contato + '\'' +
                ", relato='" + relato + '\'' +
                '}';
    }
}

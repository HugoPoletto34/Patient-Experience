package com.fhsfa.cxs.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "setor")
@AllArgsConstructor
@Getter
@Setter
public class Setor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeSetor;

    @OneToOne(mappedBy = "setor")
    private Colaborador colaborador;

    @Column(name = "colaborador_id")
    private Long idColaborador;

    public Setor() {
    }

    public Setor(String setor) {
        this.nomeSetor = setor;
    }
}

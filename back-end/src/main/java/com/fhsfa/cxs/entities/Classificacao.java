package com.fhsfa.cxs.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "classificacao")
@AllArgsConstructor
@Getter
@Setter
public class Classificacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String classificacao;

    private int diasUteis;

    public Classificacao() {
    }

    public Classificacao(String classificacao) {
        this.classificacao = classificacao;
    }
}

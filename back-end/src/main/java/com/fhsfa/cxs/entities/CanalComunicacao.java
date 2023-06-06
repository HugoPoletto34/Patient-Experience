package com.fhsfa.cxs.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "canalComunicacao")
@AllArgsConstructor
@Getter
@Setter
public class CanalComunicacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String canal;

    public CanalComunicacao() {
    }

    public CanalComunicacao(String canalComunicacao) {
        this.canal = canalComunicacao;
    }
}

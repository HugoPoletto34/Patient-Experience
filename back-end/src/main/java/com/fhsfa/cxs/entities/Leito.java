package com.fhsfa.cxs.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "leito")
@AllArgsConstructor
@Getter
@Setter
public class Leito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String leito;

    public Leito() {
    }

    public Leito(String leito) {
        this.leito = leito;
    }
}

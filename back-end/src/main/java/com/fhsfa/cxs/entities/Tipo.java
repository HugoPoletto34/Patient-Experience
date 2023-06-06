package com.fhsfa.cxs.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tipo")
@AllArgsConstructor
@Getter
@Setter
public class Tipo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;

    public Tipo() {
    }

    public Tipo(String tipo) {
        this.tipo = tipo;
    }
}

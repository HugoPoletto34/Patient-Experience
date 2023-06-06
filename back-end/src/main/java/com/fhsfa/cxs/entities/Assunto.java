package com.fhsfa.cxs.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "assunto")
@AllArgsConstructor
@Getter
@Setter
public class Assunto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String assunto;

    public Assunto() {
    }

    public Assunto(String assunto) {
        this.assunto = assunto;
    }
}

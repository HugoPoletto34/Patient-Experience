package com.fhsfa.cxs.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "grauParentesco")
@AllArgsConstructor
@Getter
@Setter
public class GrauParentesco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String grauParentesco;

    public GrauParentesco() {
    }
}

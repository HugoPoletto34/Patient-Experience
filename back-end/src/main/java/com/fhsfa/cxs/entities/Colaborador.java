package com.fhsfa.cxs.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fhsfa.cxs.entities.enums.Perfil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "colaborador")
@AllArgsConstructor
@Getter
@Setter

public class Colaborador implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long matricula;
    private String nome;

    @Enumerated(EnumType.STRING)
    private Perfil perfil;

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "setor_id")
    private Setor setor;

    @Email
    private String email;

    private String senha;

    public Colaborador() {

    }
}

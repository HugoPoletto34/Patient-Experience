package com.fhsfa.cxs.dto.Request;

import com.fhsfa.cxs.entities.Colaborador;
import com.fhsfa.cxs.entities.enums.Perfil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColaboradorRequestDTO {
    private Long id;

    @NotEmpty
    private String nome;

    @NotEmpty
    private String email;

    @NotEmpty
    private String setor;
    private Long matricula;

    private Perfil perfil;

    public ColaboradorRequestDTO(Colaborador c) {
        this.id = (Long) c.getId();
        this.nome = c.getNome().toString();
        this.email = c.getEmail().toString();
        this.matricula = (Long)c.getMatricula();
    }

    public Colaborador build() {

        Colaborador colaborador = new Colaborador();
        colaborador.setId((Long)this.id);
        colaborador.setNome(this.nome.toString());
        colaborador.setEmail(this.email.toString());
        colaborador.setMatricula((Long)this.matricula);
        colaborador.setPerfil(this.perfil);
        return colaborador;
    }
}

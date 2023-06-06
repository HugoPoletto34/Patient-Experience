package com.fhsfa.cxs.dto.Response;

import com.fhsfa.cxs.entities.Colaborador;
import com.fhsfa.cxs.entities.Setor;
import com.fhsfa.cxs.entities.enums.Perfil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SetorResponseDTO {
    private Long id;
    private String nomeSetor;
    private ColaboradorResponseDTO colaborador;


    public SetorResponseDTO(Setor entity) {
        this.id = entity.getId();
        this.nomeSetor = entity.getNomeSetor();
        if (entity.getColaborador() != null)
            this.colaborador = new ColaboradorResponseDTO(entity.getColaborador());
    }

    public static SetorResponseDTO build(Setor colab) {
        SetorResponseDTO resp = new SetorResponseDTO();
        resp.setId(colab.getId());
        resp.setNomeSetor(colab.getNomeSetor());
        resp.setColaborador(new ColaboradorResponseDTO(colab.getColaborador()));
        return resp;
    }
}

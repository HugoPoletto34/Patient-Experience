package com.fhsfa.cxs.dto.Response;

import com.fhsfa.cxs.entities.Colaborador;
import com.fhsfa.cxs.entities.enums.Perfil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColaboradorResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private Long matricula;

    private String setor;

    private Perfil perfil;

    public ColaboradorResponseDTO(Colaborador entity) {
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.email = entity.getEmail();
        this.matricula = entity.getMatricula();
        this.setor = entity.getSetor() != null ? entity.getSetor().getNomeSetor() : null;
        this.perfil = entity.getPerfil();
    }

    public static ColaboradorResponseDTO build(Colaborador colab) {
        ColaboradorResponseDTO resp = new ColaboradorResponseDTO();
        resp.setId(colab.getId());
        resp.setNome(colab.getNome());
        resp.setEmail(colab.getEmail());
        resp.setMatricula(colab.getMatricula());
        resp.setPerfil(colab.getPerfil());
        return resp;
    }

    public static List<ColaboradorResponseDTO> converterListToDTOList(List<Colaborador> list) {
        List<ColaboradorResponseDTO> response = new ArrayList<>();

        for (Colaborador c : list) {
            response.add(build(c));
        }
        return response;
    }
}

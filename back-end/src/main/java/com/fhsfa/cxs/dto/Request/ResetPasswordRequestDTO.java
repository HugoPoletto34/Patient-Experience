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
public class ResetPasswordRequestDTO {

    private Long id;

    private String novaSenha;

}

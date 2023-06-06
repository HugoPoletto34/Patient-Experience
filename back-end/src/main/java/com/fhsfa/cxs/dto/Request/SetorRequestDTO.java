package com.fhsfa.cxs.dto.Request;

import com.fhsfa.cxs.entities.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SetorRequestDTO {

    private String nomeSetor;

    public SetorRequestDTO(Setor obj){
        this.nomeSetor = obj.getNomeSetor();
    }

    public Setor build(){
        Setor setor = new Setor();
        setor.setNomeSetor(this.nomeSetor);
        return setor;
    }

}

package com.fhsfa.cxs.dto.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CredentialsDTO implements Serializable {
    public static final long serialVersionUID = 12389128937L;

    private Long matricula;

    private String senha;

}

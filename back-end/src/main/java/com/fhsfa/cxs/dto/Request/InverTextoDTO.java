package com.fhsfa.cxs.dto.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InverTextoDTO implements Serializable {
    public static final long serialVersionUID = 12389128937L;

    private LocalDate date;

    private String name;
    private String type;
    private String level;

}

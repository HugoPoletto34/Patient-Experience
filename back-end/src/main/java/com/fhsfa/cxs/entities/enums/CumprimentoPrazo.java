package com.fhsfa.cxs.entities.enums;

public enum CumprimentoPrazo {
    SIM("Dentro do Prazo"), NAO("Fora do Prazo");

    private String descricao;

    CumprimentoPrazo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}

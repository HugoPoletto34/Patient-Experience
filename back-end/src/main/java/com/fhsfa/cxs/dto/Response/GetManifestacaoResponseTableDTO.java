package com.fhsfa.cxs.dto.Response;

import com.fhsfa.cxs.entities.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetManifestacaoResponseTableDTO {

    private Long id;
    private String paciente;
    private String canalComunicacao;
    private String setor;
    private String assunto;
    private String tipo;
    private String leito;
    private String contato;
    private String relato;
    private String grauParentesco;
    private String classificacao;

    private String dataInicioManifestacao;
    private String dataFinalManifestacao;

    private String respostaSetor;
    private String observacao;
    private String cumprimentoPrazo;
    private String dataResposta;

    private String ativo;

    public GetManifestacaoResponseTableDTO(Manifestacao obj){
        this.id = obj.getId();
        this.paciente = obj.getPaciente();
        this.contato = obj.getContato();
        this.canalComunicacao = obj.getCanalComunicacao().getCanal();
        this.assunto = obj.getAssunto().getAssunto();
        this.tipo = obj.getTipo().getTipo();
        this.leito = obj.getLeito().getLeito();
        this.relato = obj.getRelato();
        this.setor = obj.getSetor().getNomeSetor();
        this.classificacao = obj.getClassificacao().getClassificacao();
        this.grauParentesco = obj.getGrauParentesco().getGrauParentesco();
        this.dataInicioManifestacao = obj.getDataInicioManifestacao().toString();
        this.dataFinalManifestacao = obj.getDataFinalManifestacao().toString();
        this.respostaSetor = obj.getRespostaSetor() != null ? obj.getRespostaSetor().getResposta() : "Não respondida";
        this.observacao = obj.getRespostaSetor() != null ? obj.getRespostaSetor().getObservacao() : "Não respondida";
        this.cumprimentoPrazo = obj.getRespostaSetor() != null ? obj.getRespostaSetor().getCumprimentoPrazo().getDescricao() : "Não respondida";
        this.dataResposta = obj.getRespostaSetor() != null ? obj.getRespostaSetor().getDataResposta().toString() : "Não respondida";
        this.ativo = obj.isAtivo() ? "Sim" : "Não";
    }

    public Manifestacao build(){
        Manifestacao pm = new Manifestacao();
        pm.setId(this.id);
        pm.setPaciente(this.paciente);
        pm.setContato(this.contato);
        pm.setCanalComunicacao(new CanalComunicacao(this.canalComunicacao));
        pm.setAssunto(new Assunto(this.assunto));
        pm.setTipo(new Tipo(this.tipo));
        pm.setLeito(new Leito(this.leito));
        pm.setRelato(this.relato);
        pm.setClassificacao(new Classificacao(this.classificacao));
        pm.setSetor(new Setor(this.setor));
        pm.setDataInicioManifestacao(LocalDate.parse(this.dataInicioManifestacao));
        pm.setDataFinalManifestacao(LocalDate.parse(this.dataFinalManifestacao));
        pm.setAtivo(this.ativo == "Sim");
        pm.setRespostaSetor(new RespostaSetor(this.respostaSetor));
        return pm;
    }

}

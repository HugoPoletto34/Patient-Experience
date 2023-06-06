package com.fhsfa.cxs.dto.Request;

import com.fhsfa.cxs.entities.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManifestacaoRequestDTO {

    private Long id;
    private String paciente;
    private CanalComunicacao canalComunicacao;
    private SetorRequestDTO setor;
    private Assunto assunto;
    private Tipo tipo;
    private Leito leito;
    private GrauParentesco grauParentesco;
    private String contato;
    private String relato;
    private Classificacao classificacao;
    private String dataInicioManifestacao;
    private String dataFinalManifestacao;
    private boolean ativo;

    public ManifestacaoRequestDTO(Manifestacao obj){
        this.id = obj.getId();
        this.paciente = obj.getPaciente();
        this.contato = obj.getContato();
        this.canalComunicacao = obj.getCanalComunicacao();
        this.assunto = obj.getAssunto();
        this.tipo = obj.getTipo();
        this.leito = obj.getLeito();
        this.grauParentesco = obj.getGrauParentesco();
        this.relato = obj.getRelato();
        this.classificacao = obj.getClassificacao();
        this.ativo = obj.isAtivo();
        this.setor = new SetorRequestDTO(obj.getSetor());
        this.dataInicioManifestacao = obj.getDataInicioManifestacao().toString();
        this.dataFinalManifestacao = obj.getDataFinalManifestacao().toString();
    }

    public Manifestacao build(){
        Manifestacao pm = new Manifestacao();
        pm.setId(this.id);
        pm.setPaciente(this.paciente);
        pm.setContato(this.contato);
        pm.setCanalComunicacao(this.canalComunicacao);
        pm.setAssunto(this.assunto);
        pm.setTipo(this.tipo);
        pm.setGrauParentesco(this.grauParentesco);
        pm.setLeito(this.leito);
        pm.setRelato(this.relato);
        pm.setSetor(this.setor.build());
        pm.setClassificacao(this.classificacao);
        pm.setAtivo(this.ativo);
        return pm;
    }

}

package com.fhsfa.cxs.dto.Response;

import com.fhsfa.cxs.entities.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManifestacaoResponseDTO {
    private Long id;
    private String paciente;
    private CanalComunicacao canalComunicacao;
    private SetorResponseDTO setor;
    private Assunto assunto;
    private Tipo tipo;
    private Leito leito;
    private GrauParentesco grauParentesco;
    private String contato;
    private String relato;
    private Classificacao classificacao;

    private String dataInicioManifestacao;
    private String dataFinalManifestacao;

    private String respostaSetor;
    private String observacao;
    private String cumprimentoPrazo;
    private String dataResposta;



    private boolean ativo;

    public ManifestacaoResponseDTO(Manifestacao obj){
        this.id = obj.getId();
        this.paciente = obj.getPaciente();
        this.contato = obj.getContato();
        this.canalComunicacao = obj.getCanalComunicacao();
        this.assunto = obj.getAssunto();
        this.tipo = obj.getTipo();
        this.grauParentesco = obj.getGrauParentesco();
        this.leito = obj.getLeito();
        this.relato = obj.getRelato();
        this.setor = new SetorResponseDTO(obj.getSetor());
        this.dataInicioManifestacao = obj.getDataInicioManifestacao().toString();
        this.dataFinalManifestacao = obj.getDataFinalManifestacao().toString();
        this.classificacao = obj.getClassificacao();
        if (obj.getRespostaSetor() != null) {
            this.respostaSetor = obj.getRespostaSetor().toString();
            this.respostaSetor = obj.getRespostaSetor().getResposta();
            this.observacao = obj.getRespostaSetor().getObservacao();
            this.cumprimentoPrazo = obj.getRespostaSetor().getCumprimentoPrazo().getDescricao();
            this.dataResposta = obj.getRespostaSetor().getDataResposta().toString();
        }

        this.ativo = obj.isAtivo();
    }
}

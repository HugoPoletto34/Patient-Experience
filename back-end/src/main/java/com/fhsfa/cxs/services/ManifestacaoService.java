package com.fhsfa.cxs.services;

import com.fhsfa.cxs.dto.Request.InverTextoDTO;
import com.fhsfa.cxs.dto.Request.ManifestacaoRequestDTO;
import com.fhsfa.cxs.dto.Request.RespostaManifestacaoDTO;
import com.fhsfa.cxs.dto.Response.GetManifestacaoResponseTableDTO;
import com.fhsfa.cxs.dto.Response.ManifestacaoResponseDTO;
import com.fhsfa.cxs.entities.Manifestacao;
import com.fhsfa.cxs.entities.RespostaSetor;
import com.fhsfa.cxs.entities.enums.CumprimentoPrazo;
import com.fhsfa.cxs.repositories.*;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ManifestacaoService {

    @Autowired
    private ManifestacaoRepository patientsManifestationRepository;

    @Autowired
    private SetorRepository setorRepository;

    @Autowired
    private AssuntoRepository assuntoRepository;

    @Autowired
    private CanalComunicacaoRepository canalComunicacaoRepository;

    @Autowired
    private ClassificacaoRepository classificacaoRepository;

    @Autowired
    private GrauParentescoRepository grauParentescoRepository;

    @Autowired
    private LeitoRepository leitoRepository;

    @Autowired
    private TipoRepository tipoRepository;

    @Autowired
    private RespostaManifestacaoRepository respostaManifestacaoRepository;

    @Value("${TOKEN_API_INVERTEXTO}")
    private String apiKey;


    @Transactional
    public List<ManifestacaoResponseDTO> findAll(){
        List<Manifestacao> listResponse = patientsManifestationRepository.findAll();
        return listResponse.stream().map(obj -> new ManifestacaoResponseDTO(obj)).collect(Collectors.toList());
    }

    @Transactional
    public Manifestacao getById(Long id){
        Optional<Manifestacao> obj = patientsManifestationRepository.findById(id);
        return obj.orElseThrow(()-> new ObjectNotFoundException(1,
                "Manifestação não encontrada. Id: " + id + "||"));
    }

    @Transactional
    public ResponseEntity<ManifestacaoRequestDTO> insert(ManifestacaoRequestDTO objDTO){
        Manifestacao manifestacao = objDTO.build();
        manifestacao.setDataInicioManifestacao(LocalDate.parse(objDTO.getDataInicioManifestacao()));
        manifestacao.setDataFinalManifestacao(LocalDate.parse(objDTO.getDataFinalManifestacao()));

        manifestacao.setSetor(setorRepository.getBySetorName(objDTO.getSetor().getNomeSetor()));
        manifestacao.setCanalComunicacao(canalComunicacaoRepository.getByCanal(objDTO.getCanalComunicacao().getCanal()));
        manifestacao.setAssunto(assuntoRepository.getByAssunto(objDTO.getAssunto().getAssunto()));
        manifestacao.setLeito(leitoRepository.getByLeito(objDTO.getLeito().getLeito()));
        manifestacao.setGrauParentesco(grauParentescoRepository.getByGrauParentesco(objDTO.getGrauParentesco().getGrauParentesco()));
        manifestacao.setTipo(tipoRepository.getByTipo(objDTO.getTipo().getTipo()));
        manifestacao.setClassificacao(classificacaoRepository.getByClassificacao(objDTO.getClassificacao().getClassificacao()));
        manifestacao.setAtivo(true);
        Manifestacao obj = patientsManifestationRepository.save(manifestacao);
        return ResponseEntity.status(201).body(new ManifestacaoRequestDTO(obj));
    }

    @Transactional
    public void deleteById(Long id){
        getById(id);
        try{
            patientsManifestationRepository.deleteById(id);
        }catch(DataIntegrityViolationException e){
            throw new DataIntegrityViolationException("Não foi possivel excluir esta manifestação.");
        }
    }

    public List<GetManifestacaoResponseTableDTO> findAllToTable() {
        List<Manifestacao> listResponse = patientsManifestationRepository.findAll();
        return listResponse.stream().map(obj -> new GetManifestacaoResponseTableDTO(obj)).collect(Collectors.toList());
    }

    public List<Manifestacao> findAllBySetor(String setor) {
        return patientsManifestationRepository.findAllBySetor(setor);
    }

    public String nextBusinessDay(String dataInicio, int diasUteis) {
        LocalDate agr = LocalDate.parse(dataInicio);

        int anoAtual = agr.getYear();
        String uri = "https://api.invertexto.com/v1/holidays/" + anoAtual + "?token=" + apiKey + "&state=MG";
        RestTemplate restTemplate = new RestTemplate();
        List<InverTextoDTO> holidays = Arrays.stream(Objects.requireNonNull(restTemplate.getForObject(uri, InverTextoDTO[].class))).collect(Collectors.toCollection(LinkedList::new));

        boolean condition = true;
        LocalDate next = agr;
        while (condition || diasUteis != 0) {
            next = next.plusDays(1);

            LocalDate finalNext = next;
            if (!(next.getDayOfWeek().equals(DayOfWeek.SATURDAY) || next.getDayOfWeek().equals(DayOfWeek.SUNDAY) || holidays.stream().anyMatch((e) -> e.getDate().isEqual(finalNext)))) {
                condition = false;
                diasUteis--;
            }
        }


        return next.toString();
    }

    public ResponseEntity insertResposta(Long id, RespostaManifestacaoDTO dto) {
        Manifestacao manifestacao = this.getById(id);
        RespostaSetor respostaSetor = new RespostaSetor();
        if (manifestacao.getRespostaSetor() != null) {
            respostaSetor = manifestacao.getRespostaSetor();
        }

        respostaSetor.setResposta(dto.getResposta());
        respostaSetor.setObservacao(dto.getObservacao());
        respostaSetor.setDataResposta(LocalDate.now());
        respostaSetor.setCumprimentoPrazo(manifestacao.getDataInicioManifestacao().compareTo(respostaSetor.getDataResposta()) <= 0 ? CumprimentoPrazo.SIM : CumprimentoPrazo.NAO);
        manifestacao.setRespostaSetor(respostaSetor);
        respostaManifestacaoRepository.save(respostaSetor);
        patientsManifestationRepository.save(manifestacao);
        return ResponseEntity.ok().build();
    }
}

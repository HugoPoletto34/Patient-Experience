package com.fhsfa.cxs.services;

import com.fhsfa.cxs.dto.Request.ColaboradorRequestDTO;
import com.fhsfa.cxs.dto.Request.ResetPasswordRequestDTO;
import com.fhsfa.cxs.dto.Response.ColaboradorResponseDTO;
import com.fhsfa.cxs.entities.Colaborador;
import com.fhsfa.cxs.entities.MailObject;
import com.fhsfa.cxs.entities.Setor;
import com.fhsfa.cxs.entities.enums.Perfil;
import com.fhsfa.cxs.repositories.ColaboradorRepository;
import com.fhsfa.cxs.repositories.SetorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class ColaboradorService {
    @Autowired
    private ColaboradorRepository repository;

    @Autowired
    private SetorRepository setorRepository;

    @Autowired
    public EmailService emailService;

    @Autowired
    BCryptPasswordEncoder pe;

    @Value("${URL_FRONTEND}")
    private String URL_FRONTEND;

    @Transactional
    public List<ColaboradorResponseDTO> findAll () {
        List<Colaborador> listColaborador = repository.findAll();
        return listColaborador.stream().map(x -> new ColaboradorResponseDTO(x)).collect(Collectors.toList());
    }

    private ResponseEntity valida(Colaborador obj, String t) {
        try {
            ColaboradorResponseDTO o = new ColaboradorResponseDTO(obj);
            return ResponseEntity.ok().body(o);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(t);
        }
    }

    @Transactional
    public ResponseEntity<ColaboradorResponseDTO> getById (Long id) {
        Colaborador c = repository.getById(id);
        return valida(c, "Colaborador  id=\""+id+"\" não encontrado: Verifique se a ID colaborador informado está correto.");
    }

    @Transactional
    public ResponseEntity<ColaboradorResponseDTO> getByName (String name) {
        Colaborador c = repository.getByNome(name);
        return valida(c, "Colaborador \""+name+"\" não encontrado: Verifique se o nome do colaborador informado está correto.");
    }

    @Transactional
    public ResponseEntity<ColaboradorResponseDTO> getByMatricula (Long matricula) {
        Colaborador c = repository.getByMatricula(matricula);
        return valida(c, "Colaborador que tema a matricula  \""+matricula+"\" não encontrado: Verifique se o nome do colaborador informado está correto.");
    }

    @Transactional
    public ResponseEntity insert (ColaboradorRequestDTO dto) {

        Setor setor = setorRepository.getBySetorName(dto.getSetor());
        if (dto.getPerfil() == null)
            dto.setPerfil(Perfil.SETOR);

        Colaborador novoColaborador = dto.build();
        if (setor.getColaborador() != null) {
            return ResponseEntity.badRequest().body(null);
        }else
            novoColaborador.setSetor(setor);

        novoColaborador = repository.save(novoColaborador);
        String senha = novoColaborador.getId() + "@" + geraStringAleatoria(10);
        novoColaborador.setSenha(pe.encode(senha));

        if (dto.getId() == null) {
            MailObject mailObject = new MailObject();
            mailObject.setTo(novoColaborador.getEmail());
            mailObject.setSubject("PX - Primeiro Acesso ou Recuperação de Senha =");
            mailObject.setText("Olá " + novoColaborador.getNome() + ", seu link de recuperação de senha é: " + URL_FRONTEND + "/primeiro-acesso/" + senha);

            emailService.sendSimpleMessage(mailObject);
        }

        Colaborador c = repository.save(novoColaborador);
        return ResponseEntity.status(201).body(new ColaboradorResponseDTO(c));


    }

    public String geraStringAleatoria(int tamanho) {
        StringBuilder stringAleatoria = new StringBuilder();
        String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (int i = 0; i < tamanho; i++) {
            stringAleatoria.append(caracteres.charAt((int) Math.floor(Math.random() * caracteres.length())));
        }
        return stringAleatoria.toString();
    }

    @Transactional
    public ResponseEntity updateSenha (ResetPasswordRequestDTO dto) {
        Colaborador c = repository.getById(dto.getId());

        c.setSenha(pe.encode(dto.getNovaSenha()));

        Colaborador d = repository.save(c);

        return ResponseEntity.ok().body(new ColaboradorResponseDTO(d));
    }


    @Transactional
    public void  deleteById (Long id) {
        repository.deleteById(id);
    }


    public void deleteByMatricula(Long matricula) {
        repository.deleteByMatricula(matricula);
    }

    public ResponseEntity<ColaboradorResponseDTO> validateColaborador(String code) {
        Long id = Long.parseLong(code.split("@")[0]);
        Colaborador c = repository.getById(id);
        if (c != null) {
            if (pe.matches(code, c.getSenha())) {
                return ResponseEntity.ok().body(new ColaboradorResponseDTO(c));
            }
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.badRequest().body(null);
    }

    public ResponseEntity firstAccess(String code, ResetPasswordRequestDTO dto) {
        ResponseEntity<ColaboradorResponseDTO> response = validateColaborador(code);

        if (response.getStatusCodeValue() == 200) {
            this.updateSenha(dto);
            return ResponseEntity.ok().body(response.getBody());
        }
        return ResponseEntity.badRequest().body(null);

    }
}

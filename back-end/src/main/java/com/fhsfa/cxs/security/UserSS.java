package com.fhsfa.cxs.security;

import com.fhsfa.cxs.entities.Colaborador;
import com.fhsfa.cxs.entities.enums.Perfil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@NoArgsConstructor
public class UserSS implements UserDetails {
    private static final long SerialVersionUID = 123198239801L;

    private Long id;
    private Long matricula;
    private String nome;
    private String senha;
    private String setor;

    private Perfil perfil;

    public UserSS(Colaborador colaborador){
        this.id = colaborador.getId();
        this.matricula = colaborador.getMatricula();
        this.nome = colaborador.getNome();
        this.senha = colaborador.getSenha();
        this.perfil = colaborador.getPerfil();
        this.setor = colaborador.getSetor().getNomeSetor();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return senha;
    }

    public String getNome() {
        return nome;
    }
    @Override
    public String getUsername() {
        return String.valueOf(this.matricula);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId(){
        return this.id;
    }

    public Claims getClaims() {
        Claims claims = Jwts.claims().setSubject(this.getUsername());
        claims.put("nome", this.nome);
        claims.put("perfil", this.perfil);
        claims.put("setor", this.setor);
        claims.put("idUser", this.id);
        return claims;
    }
}

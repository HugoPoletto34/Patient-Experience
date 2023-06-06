package com.fhsfa.cxs.services;

import com.fhsfa.cxs.entities.Colaborador;
import com.fhsfa.cxs.repositories.ColaboradorRepository;
import com.fhsfa.cxs.security.UserSS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

    @Autowired
    private ColaboradorRepository repository;


    @Override
    public UserDetails loadUserByUsername(String matricula) throws UsernameNotFoundException {
        Colaborador colaborador = repository.getByMatricula(Long.parseLong(matricula));
        if(colaborador == null)
            throw new UsernameNotFoundException(matricula);
        return new UserSS(colaborador);
    }
}

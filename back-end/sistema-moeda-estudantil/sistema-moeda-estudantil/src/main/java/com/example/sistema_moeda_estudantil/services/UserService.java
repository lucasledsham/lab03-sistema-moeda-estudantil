package com.example.sistema_moeda_estudantil.services;

import com.example.sistema_moeda_estudantil.models.User;
import com.example.sistema_moeda_estudantil.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getSenderUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return userRepository.findByEmail(userDetails.getUsername());
        } catch (Exception e) {
            throw new RuntimeException("Erro ao coletar o nome do usuário logado.");
        }
    }
}

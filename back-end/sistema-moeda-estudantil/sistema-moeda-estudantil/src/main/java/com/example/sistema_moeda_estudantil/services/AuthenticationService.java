package com.example.sistema_moeda_estudantil.services;

import com.example.sistema_moeda_estudantil.dtos.AuthenticationDTO;
import com.example.sistema_moeda_estudantil.dtos.LoginResponseDTO;
import com.example.sistema_moeda_estudantil.dtos.RegisterDTO;
import com.example.sistema_moeda_estudantil.models.User;
import com.example.sistema_moeda_estudantil.models.UserRole;
import com.example.sistema_moeda_estudantil.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserRepository userRepository;

    /**
     * Autentica o usuário e gera um token JWT.
     * @param authenticationDTO DTO com email e senha.
     * @return DTO com token, nome e role do usuário.
     */
    public LoginResponseDTO login(AuthenticationDTO authenticationDTO) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(
                authenticationDTO.email(),
                authenticationDTO.password());

        // Autentica o usuário usando o AuthenticationManager
        Authentication auth = this.authenticationManager.authenticate(usernamePassword);
        User user = (User) auth.getPrincipal(); // Usuário autenticado

        // Gera o token
        String token = tokenService.generateToken(user);
        
        // Retorna o DTO de resposta
        return new LoginResponseDTO(token, user.getName(), user.getRole());
    }

    /**
     * Registra um novo usuário após verificar a duplicidade e encriptar a senha.
     * @param register DTO com dados de registro.
     * @throws IllegalArgumentException se o email já estiver em uso.
     */
    public void register(RegisterDTO register) throws IllegalArgumentException {
        if (this.userRepository.findByEmail(register.email()) != null) {
            throw new IllegalArgumentException("Usuário com este email já existe.");
        }

        String encriptedPassword = new BCryptPasswordEncoder().encode(register.password());
        User newUser = User.builder()
                .name(register.name())
                .rg(register.rg())
                .cpf(register.cpf())
                .adress(register.adress())
                .password(encriptedPassword)
                .role(register.userRole())
                .email(register.email())
                .build();

        this.userRepository.save(newUser);
    }
}
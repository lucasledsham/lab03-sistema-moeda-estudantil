package com.example.sistema_moeda_estudantil.controllers;

import com.example.sistema_moeda_estudantil.dtos.AuthenticationDTO;
import com.example.sistema_moeda_estudantil.dtos.LoginResponseDTO;
import com.example.sistema_moeda_estudantil.dtos.RegisterDTO;
import com.example.sistema_moeda_estudantil.models.User;
import com.example.sistema_moeda_estudantil.models.UserRole;
import com.example.sistema_moeda_estudantil.repositories.UserRepository;
import com.example.sistema_moeda_estudantil.services.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/auth")
@RequiredArgsConstructor
@Validated
@RestController
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody AuthenticationDTO loginAuthentication) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(
                loginAuthentication.email(),
                loginAuthentication.password());

        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());

        UserRole userRole = userRepository.findByEmail(loginAuthentication.email()).getRole();

        return new LoginResponseDTO(token, loginAuthentication.email(), userRole);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO register) {
        if (this.userRepository.findByEmail(register.email()) != null) return ResponseEntity.badRequest().build();

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

        return ResponseEntity.ok().build();
    }

}

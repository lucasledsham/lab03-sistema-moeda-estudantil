package com.example.sistema_moeda_estudantil.controllers;

import com.example.sistema_moeda_estudantil.dtos.AuthenticationDTO;
import com.example.sistema_moeda_estudantil.dtos.LoginResponseDTO;
import com.example.sistema_moeda_estudantil.dtos.RegisterDTO;
import com.example.sistema_moeda_estudantil.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody AuthenticationDTO loginAuthentication) {
        // Toda a lógica de autenticação e token é delegada ao serviço
        LoginResponseDTO response = authenticationService.login(loginAuthentication);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO register) {
        try {
            // Toda a lógica de validação e salvamento é delegada ao serviço
            authenticationService.register(register);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            // Lógica de tratamento de erro para usuário duplicado
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
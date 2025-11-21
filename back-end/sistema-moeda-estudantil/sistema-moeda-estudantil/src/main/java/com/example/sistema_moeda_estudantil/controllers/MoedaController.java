package com.example.sistema_moeda_estudantil.controllers;

import com.example.sistema_moeda_estudantil.dtos.EnviarMoedasDTO;
import com.example.sistema_moeda_estudantil.models.User;
import com.example.sistema_moeda_estudantil.models.UserRole;
import com.example.sistema_moeda_estudantil.repositories.UserRepository;
import com.example.sistema_moeda_estudantil.services.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/moeda")
public class MoedaController {

    private final UserRepository userRepository;
    private final UserService userService;

    @GetMapping("/balance")
    public ResponseEntity<?> consultarExtrato(String id) {
        User user = userService.getSenderUser();
        return ResponseEntity.ok(user.getCurrency());
    }

    @PostMapping("/payment")
    public ResponseEntity<?> enviarMoedas(EnviarMoedasDTO enviarMoedasDTO){
        User user = userService.getSenderUser();
        return null;
    }

    @GetMapping("/users")
    public ResponseEntity<?> consultarAlunos(){
        UserRole userRole = UserRole.STUDENT;
        List<User> listaAlunos = userRepository.findAllByRole(userRole);

        return ResponseEntity.ok(listaAlunos);
    }

    @GetMapping("/history")
    public ResponseEntity<?> consultarHistorico(){
        User user = userService.getSenderUser();
        return null;
    }

}

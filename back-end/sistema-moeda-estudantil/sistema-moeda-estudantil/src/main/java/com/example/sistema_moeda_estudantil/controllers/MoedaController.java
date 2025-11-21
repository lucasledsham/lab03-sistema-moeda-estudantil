package com.example.sistema_moeda_estudantil.controllers;

import com.example.sistema_moeda_estudantil.dtos.BalanceDTO;
import com.example.sistema_moeda_estudantil.dtos.EnviarMoedasDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
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
        return ResponseEntity.ok(new BalanceDTO(user.getCurrency()));
    }

    @PostMapping("/payment")
    public ResponseEntity<?> enviarMoedas(@RequestBody EnviarMoedasDTO enviarMoedasDTO){
        User sender = userService.getSenderUser();

        if (sender.getCurrency() < enviarMoedasDTO.amount()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorDTO("Saldo insuficiente"));
        }

        var recipientOpt = userRepository.findById(enviarMoedasDTO.recipientId());
        if (recipientOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorDTO("Destinatário não encontrado"));
        }
        User recipient = recipientOpt.get();

        sender.setCurrency(sender.getCurrency() - (float) enviarMoedasDTO.amount());
        recipient.setCurrency(recipient.getCurrency() + (float) enviarMoedasDTO.amount());
        userRepository.save(sender);
        userRepository.save(recipient);

        return ResponseEntity.ok(new PaymentResultDTO(sender.getCurrency()));
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

record PaymentResultDTO(float newBalance) {}
record ErrorDTO(String error) {}
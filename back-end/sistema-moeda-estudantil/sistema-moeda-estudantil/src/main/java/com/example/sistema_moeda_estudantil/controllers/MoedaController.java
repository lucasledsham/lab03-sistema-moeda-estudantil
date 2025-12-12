package com.example.sistema_moeda_estudantil.controllers;

import com.example.sistema_moeda_estudantil.dtos.BalanceDTO;
import com.example.sistema_moeda_estudantil.dtos.EnviarMoedasDTO;
import com.example.sistema_moeda_estudantil.dtos.ErrorDTO;
import com.example.sistema_moeda_estudantil.dtos.PaymentResultDTO;
import com.example.sistema_moeda_estudantil.models.User;
import com.example.sistema_moeda_estudantil.services.MoedaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/moeda")
public class MoedaController {

    private final MoedaService moedaService;

    @GetMapping("/balance")
    public ResponseEntity<BalanceDTO> consultarExtrato() {
        // Lógica de saldo delegada ao service
        BalanceDTO balance = moedaService.getBalance();
        return ResponseEntity.ok(balance);
    }

    @PostMapping("/payment")
    public ResponseEntity<?> enviarMoedas(@RequestBody EnviarMoedasDTO enviarMoedasDTO) {
        try {
            // Lógica de pagamento delegada ao service
            PaymentResultDTO result = moedaService.performPayment(enviarMoedasDTO);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            // Trata erro de saldo insuficiente (Bad Request - 400)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorDTO(e.getMessage()));
        } catch (NoSuchElementException e) {
            // Trata erro de destinatário não encontrado (Not Found - 404)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorDTO(e.getMessage()));
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> consultarAlunos(){
        // Lógica de listagem delegada ao service
        List<User> listaAlunos = moedaService.listStudents();
        return ResponseEntity.ok(listaAlunos);
    }

    @GetMapping("/history")
    public ResponseEntity<?> consultarHistorico(){
        // Lógica de histórico delegada ao service (retorna null por enquanto)
        return ResponseEntity.ok(moedaService.getTransactionHistory());
    }

}
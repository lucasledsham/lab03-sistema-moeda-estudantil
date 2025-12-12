package com.example.sistema_moeda_estudantil.services;

import com.example.sistema_moeda_estudantil.dtos.BalanceDTO;
import com.example.sistema_moeda_estudantil.dtos.EnviarMoedasDTO;
import com.example.sistema_moeda_estudantil.dtos.PaymentResultDTO;
import com.example.sistema_moeda_estudantil.models.User;
import com.example.sistema_moeda_estudantil.models.UserRole;
import com.example.sistema_moeda_estudantil.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MoedaService {

    private final UserService userService;
    private final UserRepository userRepository;

    /**
     * Retorna o saldo do usuário logado.
     */
    public BalanceDTO getBalance() {
        User user = userService.getSenderUser();
        return new BalanceDTO(user.getCurrency());
    }

    /**
     * Realiza a transferência de moedas entre usuários.
     * @param enviarMoedasDTO DTO com ID do destinatário e valor.
     * @return PaymentResultDTO com o novo saldo do remetente.
     * @throws IllegalArgumentException se o saldo for insuficiente.
     * @throws NoSuchElementException se o destinatário não for encontrado.
     */
    public PaymentResultDTO performPayment(EnviarMoedasDTO enviarMoedasDTO) throws IllegalArgumentException, NoSuchElementException {
        User sender = userService.getSenderUser();
        double amount = enviarMoedasDTO.amount();

        // 1. Verificar Saldo
        if (sender.getCurrency() < amount) {
            throw new IllegalArgumentException("Saldo insuficiente");
        }

        // 2. Buscar Destinatário
        Optional<User> recipientOpt = userRepository.findById(enviarMoedasDTO.recipientId());
        if (recipientOpt.isEmpty()) {
            throw new NoSuchElementException("Destinatário não encontrado");
        }
        User recipient = recipientOpt.get();

        // 3. Processar Transação
        sender.setCurrency(sender.getCurrency() - (float) amount);
        recipient.setCurrency(recipient.getCurrency() + (float) amount);

        // 4. Salvar
        userRepository.save(sender);
        userRepository.save(recipient);

        return new PaymentResultDTO(sender.getCurrency());
    }

    /**
     * Lista todos os usuários com o papel (Role) de STUDENT.
     */
    public List<User> listStudents() {
        return userRepository.findAllByRole(UserRole.STUDENT);
    }
    
    /**
     * Consulta o histórico de transações. Implementação pendente.
     */
    public Object getTransactionHistory() {
        // Implementar lógica de busca e mapeamento do histórico aqui
        return null;
    }
}
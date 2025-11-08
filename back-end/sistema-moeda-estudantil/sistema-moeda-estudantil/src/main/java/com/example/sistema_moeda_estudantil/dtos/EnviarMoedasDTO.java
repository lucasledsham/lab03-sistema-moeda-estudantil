package com.example.sistema_moeda_estudantil.dtos;


public record EnviarMoedasDTO(
        String recipientId, double amount, String message) {
}

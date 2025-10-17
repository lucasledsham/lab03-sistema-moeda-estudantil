package com.example.sistema_moeda_estudantil.dtos;

import lombok.Builder;

@Builder
public record UserDetailsResponseDTO(String email, String name) {
}


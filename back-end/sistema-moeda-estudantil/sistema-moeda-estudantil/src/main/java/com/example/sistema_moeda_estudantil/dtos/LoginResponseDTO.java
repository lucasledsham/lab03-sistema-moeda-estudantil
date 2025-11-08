package com.example.sistema_moeda_estudantil.dtos;


import com.example.sistema_moeda_estudantil.models.UserRole;

public record LoginResponseDTO(String token, String nome, UserRole role){
}

package com.example.sistema_moeda_estudantil.dtos;


import com.example.sistema_moeda_estudantil.models.UserRole;

public record RegisterDTO(String nome,
                          String password,
                          String email,
                          UserRole userRole
                          ) {
}

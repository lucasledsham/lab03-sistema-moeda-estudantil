package com.example.sistema_moeda_estudantil.dtos;


import com.example.sistema_moeda_estudantil.models.UserRole;

public record RegisterDTO(String name,
                          String password,
                          String email,
                          UserRole userRole,
                          String rg,
                          String cpf,
                          String adress
                          ) {
}

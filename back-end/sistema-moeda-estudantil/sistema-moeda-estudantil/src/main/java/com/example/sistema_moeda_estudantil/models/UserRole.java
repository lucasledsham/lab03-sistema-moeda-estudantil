package com.example.sistema_moeda_estudantil.models;

import lombok.Getter;

@Getter
public enum UserRole {
    STUDENT("aluno"),
    COMPANY("empresa");

    private final String role;

    UserRole (String role){
        this.role = role;
    }
}

package com.example.sistema_moeda_estudantil.controllers;

import com.example.sistema_moeda_estudantil.dtos.UserReturnDTO;
import com.example.sistema_moeda_estudantil.models.User;
import com.example.sistema_moeda_estudantil.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getLoggedUser(){
        try{
            User user = userService.getSenderUser();
            return ResponseEntity.ok(new UserReturnDTO(user.getName(), user.getId()));
        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

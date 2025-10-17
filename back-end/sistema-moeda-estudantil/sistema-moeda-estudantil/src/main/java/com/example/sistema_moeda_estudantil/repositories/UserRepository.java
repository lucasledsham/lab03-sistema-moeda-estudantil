package com.example.sistema_moeda_estudantil.repositories;

import com.example.sistema_moeda_estudantil.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByNome(String username);
}

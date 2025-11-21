package com.example.sistema_moeda_estudantil.repositories;

import com.example.sistema_moeda_estudantil.models.Benefit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BenefitRepository extends MongoRepository<Benefit, String> {
    List<Benefit> findAllByUserId(String userId);
    Benefit findByUserId(String userId);
}

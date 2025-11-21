package com.example.sistema_moeda_estudantil.models;

import lombok.*;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "benefits")
@Data
@EqualsAndHashCode(of = "id")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Benefit {

    @Id
    private String id;

    private String userId;

    private String description;

    private float cost;

    private Binary image;

    private String contentType;
}

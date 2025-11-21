package com.example.sistema_moeda_estudantil.controllers;

import com.example.sistema_moeda_estudantil.dtos.BenefitDTO;
import com.example.sistema_moeda_estudantil.models.Benefit;
import com.example.sistema_moeda_estudantil.repositories.BenefitRepository;
import com.example.sistema_moeda_estudantil.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.bson.types.Binary;

import java.util.Base64;
import java.util.List;

@RequestMapping("/benefits")
@RequiredArgsConstructor
@RestController
public class BenefitsController {
    private final UserService userService;
    private final BenefitRepository benefitRepository;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> sendBenefit(
            @RequestParam("benefit") String benefitJson,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            BenefitDTO benefitDTO = mapper.readValue(benefitJson, BenefitDTO.class);

            Binary imageBinary = null;
            String contentType = null;
            if (imageFile != null && !imageFile.isEmpty()) {
                imageBinary = new Binary(imageFile.getBytes());
                contentType = imageFile.getContentType();
            }

            Benefit benefit = Benefit.builder()
                    .description(benefitDTO.description())
                    .cost(benefitDTO.cost())
                    .userId(userService.getSenderUser().getId())
                    .image(imageBinary)
                    .contentType(contentType)
                    .build();

            benefitRepository.save(benefit);
            return ResponseEntity.ok(benefit);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<BenefitDTO>> getAllBenefitsByUserId() {
        String userId = userService.getSenderUser().getId();
        List<Benefit> benefits = benefitRepository.findAllByUserId(userId);
        List<BenefitDTO> response = benefits.stream().map(this::mapToDto).toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/{benefitId}/image")
    public ResponseEntity<byte[]> downloadBenefitImage(@PathVariable String benefitId) {
        return benefitRepository.findById(benefitId)
                .filter(benefit -> benefit.getImage() != null)
                .map(benefit -> ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(benefit.getContentType()))
                        .body(benefit.getImage().getData()))
                .orElse(ResponseEntity.notFound().build());
    }

    private BenefitDTO mapToDto(Benefit benefit) {
        String base64 = null;
        if (benefit.getImage() != null) {
            base64 = Base64.getEncoder().encodeToString(benefit.getImage().getData());
        }
        return new BenefitDTO(benefit.getDescription(), (long) benefit.getCost(), base64, benefit.getContentType());
    }
}

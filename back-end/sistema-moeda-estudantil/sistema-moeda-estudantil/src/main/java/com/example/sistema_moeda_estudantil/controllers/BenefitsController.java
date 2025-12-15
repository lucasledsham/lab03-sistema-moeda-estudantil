package com.example.sistema_moeda_estudantil.controllers;

import com.example.sistema_moeda_estudantil.dtos.BenefitDTO;
import com.example.sistema_moeda_estudantil.dtos.PurchaseDTO;
import com.example.sistema_moeda_estudantil.models.Benefit;
import com.example.sistema_moeda_estudantil.repositories.BenefitRepository;
import com.example.sistema_moeda_estudantil.services.BenefitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/benefits")
@RequiredArgsConstructor
@RestController
public class BenefitsController {

    private final BenefitService benefitService;
    private final BenefitRepository benefitRepository;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> sendBenefit(@RequestParam("benefit") String benefitJson,
                                         @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        try {
            Benefit benefit = benefitService.createBenefit(benefitJson, imageFile);
            return ResponseEntity.ok(benefit);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao criar benefício");
        }
    }

    @GetMapping
    public ResponseEntity<List<BenefitDTO>> getAllBenefits() {
        return ResponseEntity.ok(benefitService.listAllBenefits());
    }

    @GetMapping("/{benefitId}/image")
    public ResponseEntity<byte[]> downloadBenefitImage(@PathVariable String benefitId) {

        return benefitRepository.findById(benefitId)
                .filter(b -> b.getImage() != null)
                .map(benefit -> ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(benefit.getContentType()))
                        .body(benefit.getImage().getData()))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/purchase/{benefitId}")
    public ResponseEntity<PurchaseDTO> purchaseBenefit(
            @PathVariable String benefitId,
            @RequestParam long cost) {

        PurchaseDTO dto = benefitService.purchaseBenefit(benefitId, cost);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/update/{benefitId}")
    public ResponseEntity<?> updateBenefit(@PathVariable String benefitId,
            @RequestParam("benefit") String benefitJson) {

        try {
            Benefit benefit = benefitService.updateBenefit(benefitId, benefitJson);
            return ResponseEntity.ok(benefit);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao atualizar benefício: " + e.getMessage());
        }
    }

    @DeleteMapping("/excluir/{benefitId}")
    public ResponseEntity<?> deleteBenefit(@PathVariable String benefitId) {

        try {
            benefitService.deleteBenefit(benefitId);
            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao excluir benefício: " + e.getMessage());
        }
    }
}
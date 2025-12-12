package com.example.sistema_moeda_estudantil.services;

import com.example.sistema_moeda_estudantil.dtos.BenefitDTO;
import com.example.sistema_moeda_estudantil.dtos.PurchaseDTO;
import com.example.sistema_moeda_estudantil.models.Benefit;
import com.example.sistema_moeda_estudantil.models.User;
import com.example.sistema_moeda_estudantil.repositories.BenefitRepository;
import com.example.sistema_moeda_estudantil.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BenefitService {

    private final UserService userService;
    private final BenefitRepository benefitRepository;
    private final UserRepository userRepository;
    private final ObjectMapper mapper = new ObjectMapper();

    public Benefit createBenefit(String benefitJson, MultipartFile imageFile) throws Exception {

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

        return benefitRepository.save(benefit);
    }

    public List<BenefitDTO> listAllBenefits() {
        return benefitRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public byte[] downloadImage(Benefit benefit) {
        return benefit.getImage().getData();
    }

    private BenefitDTO convertToDTO(Benefit benefit) {
        String base64 = null;

        if (benefit.getImage() != null) {
            base64 = Base64.getEncoder().encodeToString(benefit.getImage().getData());
        }

        return new BenefitDTO(
                benefit.getId(),
                benefit.getDescription(),
                (long) benefit.getCost(),
                base64,
                benefit.getContentType()
        );
    }

    public PurchaseDTO purchaseBenefit(String benefitId, long cost) {

        User user = userService.getSenderUser();
        user.setCurrency(user.getCurrency() - cost);
        userRepository.save(user);

        String coupon = RandomStringUtils.random(6, true, true);

        return new PurchaseDTO(coupon);
    }
}
package com.example.ChristmasVoting.service;

import com.example.ChristmasVoting.model.Dessert;
import com.example.ChristmasVoting.repository.DessertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class DessertService {
    @Autowired
    private DessertRepository dessertRepository;

    public void saveDessert(Dessert dessert) {
        dessertRepository.save(dessert);
    }

    public Dessert getDessertById(Long id) {
        return dessertRepository.findById(id).orElse(null);
    }

    public List<Dessert> getAllDesserts() {
        List<Dessert> desserts = dessertRepository.findAll();

        // Convert the image BLOB to Base64 string for the frontend
        for (Dessert dessert : desserts) {
            if (dessert.getImage() != null) {
                String base64Image = Base64.getEncoder().encodeToString(dessert.getImage());
                dessert.setImageBase64(base64Image); // Assuming you have a field for base64 encoded image
            }
        }

        return desserts;
    }
}

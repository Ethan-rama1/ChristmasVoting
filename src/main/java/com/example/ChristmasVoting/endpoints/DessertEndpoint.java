package com.example.ChristmasVoting.endpoints;

import com.example.ChristmasVoting.model.Dessert;
import com.example.ChristmasVoting.service.DessertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/desserts")
public class DessertEndpoint {
    @Autowired
    private DessertService dessertService;

    @PostMapping("/upload")
    public ResponseEntity<Dessert> uploadDessert(
        @RequestParam("name") String name,
        @RequestParam("image") MultipartFile imageFile,
        @RequestParam("isUnder30") boolean isUnder30,
        @RequestParam("category") String category
    ) {
        try {
            Dessert dessert = new Dessert(name, imageFile.getBytes(), category, isUnder30);
            dessertService.saveDessert(dessert);
            return ResponseEntity.ok(dessert);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Dessert> updateDessert(
        @RequestParam("id") Long id,
        @RequestParam("name") String name,
        @RequestParam("image") MultipartFile imageFile,
        @RequestParam("isUnder30") boolean isUnder30,
        @RequestParam("category") String category
    ) {
        try {
            Dessert dessert = dessertService.getDessertById(id);
            dessert.setName(name);
            dessert.setImage(imageFile.getBytes());
            dessert.setUnder30(isUnder30);
            dessert.setCategory(category);
            dessertService.saveDessert(dessert);
            return ResponseEntity.ok(dessert);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get")
    public ResponseEntity<List<Dessert>> getAllDesserts() {
        List<Dessert> desserts = dessertService.getAllDesserts();
        return ResponseEntity.ok(desserts);
    }

    @GetMapping("/one")
    public ResponseEntity<Dessert> getOneDessert(@RequestParam Long id) {
        return ResponseEntity.ok(dessertService.getDessertById(id));
    }

    @GetMapping("/desserts/{id}/image")
    public ResponseEntity<byte[]> getDessertImage(@PathVariable Long id) {
        Dessert dessert = dessertService.getDessertById(id);
        if (dessert != null && dessert.getImage() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)  // Or use the actual content type of the image
                    .body(dessert.getImage());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}

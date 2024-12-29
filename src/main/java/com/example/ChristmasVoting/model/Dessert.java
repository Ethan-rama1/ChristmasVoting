package com.example.ChristmasVoting.model;

import jakarta.persistence.*;

import java.util.Arrays;

@Entity
@Table(name = "dessert")
public class Dessert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dessert_id")
    private long id;
    private String name;
    @Lob
    private byte[] image;
    private String imageBase64;
    private String category;
    @Column(name = "is_under_30")
    private boolean isUnder30;

    public Dessert() {}

    public Dessert(String name, byte[] image) {
        this.name = name;
        this.image = image;
    }

    public Dessert(String name, byte[] image, String category, boolean isUnder30) {
        this.name = name;
        this.image = image;
        this.category = category;
        this.isUnder30 = isUnder30;
    }

    public Dessert(Long id, String name, byte[] image, String category, boolean isUnder30) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.category = category;
        this.isUnder30 = isUnder30;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isUnder30() {
        return isUnder30;
    }

    public void setUnder30(boolean under30) {
        isUnder30 = under30;
    }

    @Override
    public String toString() {
        return "Dessert{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", image=" + Arrays.toString(image) +
                ", imageBase64='" + imageBase64 + '\'' +
                ", category='" + category + '\'' +
                ", isUnder30=" + isUnder30 +
                '}';
    }
}

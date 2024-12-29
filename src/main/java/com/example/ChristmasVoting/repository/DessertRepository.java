package com.example.ChristmasVoting.repository;

import com.example.ChristmasVoting.model.Dessert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DessertRepository extends JpaRepository <Dessert, Long> {
}

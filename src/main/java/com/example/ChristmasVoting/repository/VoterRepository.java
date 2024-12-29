package com.example.ChristmasVoting.repository;

import com.example.ChristmasVoting.model.Voter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoterRepository extends JpaRepository <Voter, Long> {
    Voter findVoterByCode(String code);
}
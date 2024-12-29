package com.example.ChristmasVoting.repository;

import com.example.ChristmasVoting.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository <Vote, Long> {
}

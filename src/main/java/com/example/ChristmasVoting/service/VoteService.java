package com.example.ChristmasVoting.service;

import com.example.ChristmasVoting.model.*;
import com.example.ChristmasVoting.repository.DessertRepository;
import com.example.ChristmasVoting.repository.VoteRepository;
import com.example.ChristmasVoting.repository.VoterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VoteService {
    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private VoterRepository voterRepository;

    @Autowired
    private DessertRepository dessertRepository;

    @Transactional
    public Vote castVote(Long dessertId, String voterCode, String category) {
        Voter voter = voterRepository.findVoterByCode(voterCode);
        Dessert dessert = dessertRepository.findById(dessertId).orElseThrow(() -> new RuntimeException("Dessert not found"));

        Vote vote = new Vote(dessert, voter, category);

        return voteRepository.save(vote);
    }

    public List<Vote> getVotes() {
        return voteRepository.findAll();
    }
}

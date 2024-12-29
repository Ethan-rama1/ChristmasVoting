package com.example.ChristmasVoting.service;

import com.example.ChristmasVoting.model.Voter;
import com.example.ChristmasVoting.repository.VoterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class VoterService {
    @Autowired
    private VoterRepository voterRepository;

    public void addVoter(Voter voter) {
        voterRepository.save(voter);
    }

    public List<Voter> getVoters() {
        return voterRepository.findAll();
    }

    public Voter getVoterByCode(String code) throws NullPointerException {
        return Objects.requireNonNull(voterRepository.findVoterByCode(code));
    }
}

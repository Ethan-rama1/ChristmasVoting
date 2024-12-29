package com.example.ChristmasVoting.endpoints;

import com.example.ChristmasVoting.model.Vote;
import com.example.ChristmasVoting.model.Voter;
import com.example.ChristmasVoting.service.VoteService;
import com.example.ChristmasVoting.service.VoterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/votes")
public class VoteEndpoint {
    @Autowired
    private VoteService voteService;

    @Autowired
    private VoterService voterService;

    @PostMapping("/cast")
    public ResponseEntity<?> saveVote(
        @RequestParam("code") String code,
        @RequestParam("vote1") Long vote1,
        @RequestParam("vote2") Long vote2,
        @RequestParam("vote3") Long vote3,
        @RequestParam("vote4") Long vote4,
        @RequestParam("vote5") Long vote5
    ) {
        voteService.castVote(vote1, code, "cookies");
        voteService.castVote(vote2, code, "cakes");
        voteService.castVote(vote3, code, "under30");
        voteService.castVote(vote4, code, "creative");
        Voter v = voteService.castVote(vote5, code, "overall").getVoter();
        v.setVoted(true);
        voterService.addVoter(v);
        return ResponseEntity.ok(200);
    }

    @GetMapping("/get")
    public List<Vote> getVotes() {
        return voteService.getVotes();
    }
}

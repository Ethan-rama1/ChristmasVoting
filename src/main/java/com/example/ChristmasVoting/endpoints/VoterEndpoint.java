package com.example.ChristmasVoting.endpoints;

import com.example.ChristmasVoting.model.Voter;
import com.example.ChristmasVoting.service.VoterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/voter")
public class VoterEndpoint {
    @Autowired
    private VoterService voterService;

    @PostMapping("/generate")
    public ResponseEntity<?> saveVoter(@RequestParam String code) {
        Voter voter = new Voter(code);
        voterService.addVoter(voter);
        return ResponseEntity.ok(200);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateVoter(@RequestParam("name") String name, @RequestParam("code") String code) {
        try {
            Voter v = voterService.getVoterByCode(code);
            if (v.getVoted() || v.getName() != null) {
                return ResponseEntity.status(202).build(); // status 202
            }
            v.setName(name);
            voterService.addVoter(v);
            return ResponseEntity.ok().build(); // Updates name to voter
        } catch (NullPointerException n) {
            return ResponseEntity.status(201).build();
        } // Invalid code
    }

    @PutMapping("/revert")
    public ResponseEntity<?> revertVoter(@RequestParam("code") String code) {
        try {
            Voter v = voterService.getVoterByCode(code);
            v.setName(null);
            voterService.addVoter(v);
            return ResponseEntity.ok(200); // Reverts name to null (Cancel transaction)
        } catch (NullPointerException n) {
            return ResponseEntity.ok(201);
        } // Invalid code
    }

    @GetMapping("/get")
    public List<Voter> getVoters() {
        return voterService.getVoters();
    }
}

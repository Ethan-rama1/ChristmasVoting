package com.example.ChristmasVoting.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vote")
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_id")
    private Long vid;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "d_id", referencedColumnName = "dessert_id")
    private Dessert choice;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "voterid", referencedColumnName = "voter_id")
    private Voter voter;

    private String category;

    public Vote(Dessert choice, Voter voter, String category) {
        this.choice = choice;
        this.voter = voter;
        this.category = category;
    }

    public Vote() {}

    public Long getVid() {
        return vid;
    }

    public void setVid(Long vid) {
        this.vid = vid;
    }

    public Dessert getChoice() {
        return choice;
    }

    public void setChoice(Dessert choice) {
        this.choice = choice;
    }

    public Voter getVoter() {
        return voter;
    }

    public void setVoter(Voter voter) {
        this.voter = voter;
    }
}

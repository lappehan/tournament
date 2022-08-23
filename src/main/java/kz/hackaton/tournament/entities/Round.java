package kz.hackaton.tournament.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "round")
@Getter
@Setter
public class Round {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "stage")
    private Integer stage;

    @OneToMany(mappedBy = "round", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Match> matchList;

    @ManyToOne
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;

    public Round delete(Match match) {
        matchList.remove(match);
        match.setRound(null);
        return this;
    }







}

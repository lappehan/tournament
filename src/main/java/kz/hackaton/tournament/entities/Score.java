package kz.hackaton.tournament.entities;

import javax.persistence.*;

@Entity
@Table(name = "score")
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Scores score;

    private enum Scores {
        S1, S0;
    }


}


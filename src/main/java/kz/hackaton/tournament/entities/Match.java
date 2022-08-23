package kz.hackaton.tournament.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "match")
@Getter
@Setter
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id1")
    private Long user1;


    @Column(name = "user_id2")
    private Long user2;

    @Column(name = "winner")
    private Long winner;
    @Column(name = "match_date")
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "round_id")
    private Round round;




}

package kz.hackaton.tournament.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class UserFact {
    @Id
    @GeneratedValue
    private long id;
    private String fact;
    private String learnedMaterial;
    private long id_of_feedbacker;
    @ManyToOne
    @JoinColumn(name = "user_fact_id")
    private User user;

}

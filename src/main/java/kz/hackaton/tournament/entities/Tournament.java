package kz.hackaton.tournament.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "tournaments")
public class Tournament {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @ManyToMany
    @JoinTable(name = "tournaments_users",
            joinColumns = @JoinColumn(name = "tournament_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Collection<User> users;

    @OneToMany(mappedBy = "tournament", cascade = CascadeType.REMOVE)
    public List<Round> roundList;

    @Column(name = "owner_id")
    private Long owner;


    @Column(name = "created_date")
    private LocalDate createdDate;

    @Column(name = "description")
    private String description;

    @Column(name = "started_date")
    private LocalDate startedDate;
    @Column(name = "finished_date")
    private LocalDate finishedDate;


    @Column(name = "status")
    private String status;

    @Column(name = "admin_owner")
    private boolean adminOwner;


}

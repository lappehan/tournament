package kz.hackaton.tournament.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class UserTournamentDto {
    private String username;
    private long id;
    private int points;
}

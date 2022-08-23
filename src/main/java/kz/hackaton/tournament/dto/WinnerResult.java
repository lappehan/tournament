package kz.hackaton.tournament.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WinnerResult {
    private Long tournamentId;

    private int stage;

    private String name;
    private String surname;

}

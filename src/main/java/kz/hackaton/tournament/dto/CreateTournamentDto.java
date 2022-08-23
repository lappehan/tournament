package kz.hackaton.tournament.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateTournamentDto {
    private String name;
    private String type;
    private String description;

}

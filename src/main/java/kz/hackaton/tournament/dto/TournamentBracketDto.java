package kz.hackaton.tournament.dto;

import kz.hackaton.tournament.entities.Round;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class TournamentBracketDto {
    private Long id;
    private String name;
    private String type;
    private String description;
    private String startedDate;

    private String finishedDate;
    private List<RoundDto> roundList;

    public TournamentBracketDto(Long id, String name, String type, String description) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
    }
}

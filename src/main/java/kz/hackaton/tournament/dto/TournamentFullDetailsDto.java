package kz.hackaton.tournament.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter

public class TournamentFullDetailsDto {
    private Long id;
    private String name;
    private String type;
    private String description;
    private List<UserDto> list;
    private boolean isAdminOwner;

    public TournamentFullDetailsDto(Long id, String name, String type, String description) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
    }
}

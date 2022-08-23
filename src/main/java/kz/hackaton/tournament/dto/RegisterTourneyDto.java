package kz.hackaton.tournament.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterTourneyDto {
    private Long id;

    private String name;

    private String type;

    private String description;

    private Integer participants;
    private boolean isAdminOwner;
}

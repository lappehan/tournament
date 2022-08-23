package kz.hackaton.tournament.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MatchDto {



    private String username1;
    private String username2;
    private String winner;
    private Long match_id;
}

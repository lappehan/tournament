package kz.hackaton.tournament.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LeaderBoardDto {
    private String name;
    private String surname;
    private Long score;
}

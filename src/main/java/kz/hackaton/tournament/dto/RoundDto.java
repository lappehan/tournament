package kz.hackaton.tournament.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class RoundDto {
    public RoundDto(int stage) {
        this.stage = stage;
    }

    private int stage;
    List<MatchDto> matches;
}

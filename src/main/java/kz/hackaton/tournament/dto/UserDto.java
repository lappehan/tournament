package kz.hackaton.tournament.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserDto {
    private String login;
    private String firstName;
    private String lastName;
    private String major;
}

package kz.hackaton.tournament.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserFullDto {
    private String login;
    private String firstName;
    private String lastName;
    private String major;
    private List<String> facts;

    public UserFullDto(String login, String firstName, String lastName, String major) {
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.major = major;
    }
}

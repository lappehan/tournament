package kz.hackaton.tournament.dto;

import lombok.Data;

@Data
public class JwtRequest {
    private String login;
    private String name;
    private String surname;
    private String major;
    private String password;
}
package kz.hackaton.tournament.controllers;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class UserDTO {
    private final String username;
    private final String password;
}

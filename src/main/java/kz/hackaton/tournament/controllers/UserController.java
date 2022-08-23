package kz.hackaton.tournament.controllers;
import kz.hackaton.tournament.dto.UserDto;
import kz.hackaton.tournament.dto.UserFullDto;
import kz.hackaton.tournament.entities.User;
import kz.hackaton.tournament.repositories.UserRepository;
import kz.hackaton.tournament.services.RoundService;
import kz.hackaton.tournament.services.TournamentService;
import kz.hackaton.tournament.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final RoundService roundService;

    @GetMapping
    public UserDto getUser(Principal principal) {
        User user = userService.findUserByLogin(principal.getName());
        return new UserDto(user.getLogin(), user.getName(), user.getSurname(), user.getMajor());
    }

    @GetMapping("/info")
    public UserFullDto getFullInfo(@RequestParam String surname, @RequestParam String name) {
        return userService.userInfo(surname, name);

    }







}

package kz.hackaton.tournament.controllers;


import kz.hackaton.tournament.dto.CreateTournamentDto;
import kz.hackaton.tournament.responses.ResponseMessage;
import kz.hackaton.tournament.services.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final TournamentService tournamentService;

    @DeleteMapping("/delete/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseMessage> deleteTournament(@PathVariable Long id) {
        tournamentService.deleteTournament(id);
        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Successfully deleted").build(), HttpStatus.OK);
    }

    @DeleteMapping("/delete-player")
    public ResponseEntity<ResponseMessage> deletePlayer(@RequestParam Long tournament_id,
                                                        @RequestParam String player_name,
                                                        @RequestParam String player_lastname) {
        tournamentService.deletePlayerFromTournament(tournament_id, player_name, player_lastname);
        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Successfully deleted player from tournament").build(), HttpStatus.OK);
    }

    @PutMapping("/delete-user")
    public ResponseEntity<ResponseMessage> deleteTournament(@RequestParam(name = "username") String username,
                                                            @RequestParam(name = "surname") String surname) {
        tournamentService.deleteUser(username,surname);
        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Successfully deleted user").build(), HttpStatus.OK);
    }


    @PutMapping("/change_result")
    public ResponseEntity<ResponseMessage> updateMatchResult(@RequestParam String winnerName,
                                                             @RequestParam String winnerSurname,
                                                             @RequestParam Long match_id
                                                                ) {
        tournamentService.updateMatchResult(winnerName, winnerSurname, match_id);
        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Successfully updated match results").build(), HttpStatus.OK);
    }

    @PostMapping("/super/tourney")
    public ResponseEntity<ResponseMessage> createTournament(@RequestBody CreateTournamentDto createTournamentDto, Principal principal) {
        tournamentService.registerTourneyForAdmin(createTournamentDto, principal.getName());
        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Successfully created").build(), HttpStatus.OK);
    }



}

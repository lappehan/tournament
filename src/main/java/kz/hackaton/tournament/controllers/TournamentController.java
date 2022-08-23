package kz.hackaton.tournament.controllers;

import kz.hackaton.tournament.dto.*;
import kz.hackaton.tournament.responses.ResponseMessage;
import kz.hackaton.tournament.services.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/tournament")
@RequiredArgsConstructor
public class TournamentController {

    private final TournamentService tournamentService;

    @PostMapping("/join/{tour_id}")
    public ResponseEntity<ResponseMessage> joinTourney(Principal principal, @PathVariable(name = "tour_id") Long id) {
        tournamentService.joinTourney(principal.getName(), id);
        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Successfully added").build(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseMessage> createTourney(@RequestBody CreateTournamentDto createTournamentDto, Principal principal) {

        tournamentService.registerTourney(createTournamentDto, principal.getName());
        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Successfully added").build(), HttpStatus.OK);
    }

    @PostMapping("/start/{id}")
    public ResponseEntity<ResponseMessage> startTourney(@PathVariable(name = "id") Long id, Principal principal) {

        tournamentService.startTourney(id, principal.getName());
        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Successfully started").build(), HttpStatus.OK);
    }

    @PostMapping("/result-winner")
    public ResponseEntity<ResponseMessage> resultWinner(@RequestBody WinnerResult winnerResult, Principal principal) {
        tournamentService.winnerResult(winnerResult, principal.getName());

        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Successfully added").build(), HttpStatus.OK);
    }


    @GetMapping("/tourney/{status}")
    public List<RegisterTourneyDto> getTournament(@PathVariable String status) {
        return tournamentService.getRegisterTournaments(status);
    }

    @GetMapping("/tourney/id/{id}")
    public TournamentFullDetailsDto getDetailsTournament(@PathVariable Long id) {
        return tournamentService.getDetailsTournament(id);
    }

    @GetMapping("/tourney/bracket/{id}")
    public TournamentBracketDto getDetailsTournamentBracket(@PathVariable Long id) {
        return tournamentService.getDetailsTournamentBracket(id);
    }


    @GetMapping("/tourney/leaderboard/{id}")
    public List<LeaderBoardDto> getLeaderBoard(@PathVariable Long id) {
        return tournamentService.getLeaderBoard(id);
    }

    @PostMapping("/info")
    public ResponseEntity<ResponseMessage> info(@RequestBody InfoDto infoDto, Principal principal) {
        tournamentService.info(infoDto, principal.getName());

        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Successfully added").build(), HttpStatus.OK);
    }


}

package kz.hackaton.tournament.services;

import kz.hackaton.tournament.dto.TabloDto;
import kz.hackaton.tournament.entities.Match;
import kz.hackaton.tournament.entities.User;
import kz.hackaton.tournament.entities.UserFact;
import kz.hackaton.tournament.repositories.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MatchService {
    private final MatchRepository matchRepository;
    private final UserService userService;

    public void save(Match match) {
        matchRepository.save(match);
    }

    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }
}

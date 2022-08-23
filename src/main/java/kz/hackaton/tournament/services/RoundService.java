package kz.hackaton.tournament.services;

import kz.hackaton.tournament.entities.Match;
import kz.hackaton.tournament.entities.Round;
import kz.hackaton.tournament.repositories.MatchRepository;
import kz.hackaton.tournament.repositories.RoundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoundService {
    private final RoundRepository roundRepository;
    private final MatchRepository matchRepository;


    public void save(Round round) {
        roundRepository.save(round);
    }


}

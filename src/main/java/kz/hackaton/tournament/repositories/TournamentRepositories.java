package kz.hackaton.tournament.repositories;

import kz.hackaton.tournament.dto.LeaderBoardDto;


import kz.hackaton.tournament.dto.TempLeaderBoardDto;
import kz.hackaton.tournament.entities.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentRepositories extends JpaRepository<Tournament, Long> {
    List<Tournament> findByStatus(String status);

    @Query(value = "select  match.winner, count(match.winner) from tournaments \n" +
            "join round on round.tournament_id=tournaments.id\n" +
            "join match on match.round_id=round.id\n" +
            "where tournaments.id = :id \n" +
            "GROUP BY match.winner ORDER BY count(match.winner) DESC ", nativeQuery = true)
    List<TempLeaderBoardDto> getLeaderBoard(Long id);

}

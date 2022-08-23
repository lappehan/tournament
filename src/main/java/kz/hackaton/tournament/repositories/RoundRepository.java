package kz.hackaton.tournament.repositories;

import kz.hackaton.tournament.entities.Round;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoundRepository extends JpaRepository<Round, Long> {
}

package kz.hackaton.tournament.repositories;

import kz.hackaton.tournament.entities.UserFact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFactRepository extends JpaRepository<UserFact, Long> {
    @Query(value = "select * from user_fact order by id desc limit 10", nativeQuery = true)
    List<UserFact> findLastTenRow();
}

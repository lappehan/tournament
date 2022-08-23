package kz.hackaton.tournament.repositories;

import kz.hackaton.tournament.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {



    Optional<User> findUserByLogin(String username);

    User findUserBySurnameAndName(String surname, String name);

}

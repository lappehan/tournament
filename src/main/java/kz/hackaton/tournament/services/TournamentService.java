package kz.hackaton.tournament.services;

import kz.hackaton.tournament.dto.*;
import kz.hackaton.tournament.entities.*;
import kz.hackaton.tournament.exceptions.TournamentException;
import kz.hackaton.tournament.exceptions.UserException;
import kz.hackaton.tournament.repositories.TournamentRepositories;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.hibernate.SessionFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TournamentService {

    private final TournamentRepositories tournamentRepositories;
    private final UserService userService;
    private final RoundService roundService;
    private final UserFactService userFactService;
    private final MatchService matchService;

    @Transactional
    public void joinTourney(String name, Long id) {
        Tournament tournament = tournamentRepositories.findById(id).orElseThrow(() -> new RuntimeException("a"));

        User user = userService.findUserByLogin(name);
        if (tournament.getUsers().contains(user)) {
            throw new TournamentException("You're already participant");
        }
        tournament.getUsers().add(user);
        // user.getTournaments().add(tournament);


    }

    @Transactional
    public void registerTourney(CreateTournamentDto createTournamentDto, String name) {
        List<Tournament> tournaments = tournamentRepositories.findAll();

        for (Tournament x : tournaments) {
            if (x.getType().equals(createTournamentDto.getType()) && !(x.getStatus().equals("completed")))
                throw new TournamentException("Tournament " + createTournamentDto.getType() + " already exists");
        }
        Tournament tournament = new Tournament();
        tournament.setName(createTournamentDto.getName());
        tournament.setType(createTournamentDto.getType());
        tournament.setCreatedDate(LocalDate.now());
        tournament.setStatus("registration");
        tournament.setDescription(createTournamentDto.getDescription());
        User owner = userService.findUserByLogin(name);
        tournament.setOwner(owner.getId());
        tournamentRepositories.save(tournament);
    }

    @Transactional
    public void registerTourneyForAdmin(CreateTournamentDto createTournamentDto, String name) {
        Tournament tournament = new Tournament();
        tournament.setName(createTournamentDto.getName());
        tournament.setType(createTournamentDto.getType());
        tournament.setCreatedDate(LocalDate.now());
        tournament.setStatus("registration");
        tournament.setDescription(createTournamentDto.getDescription());
        tournament.setAdminOwner(true);
        User owner = userService.findUserByLogin(name);
        tournament.setOwner(owner.getId());
        tournamentRepositories.save(tournament);
    }

    @Transactional
    public void startTourney(Long id, String login) {
        User userByLogin = userService.findUserByLogin(login);

        Tournament tournament = tournamentRepositories.findById(id).orElseThrow(() -> new TournamentException("Tournament not found"));
        if (!userByLogin.getId().equals(tournament.getOwner())) {
            throw new TournamentException("Турнир может начать только тот кто его создал!");
        }
        Collection<User> users = tournament.getUsers();
        if (users.size() < 2) {
            throw new TournamentException("Как минимум два участника должны быть");
        }
        int usersCount = users.size() - 1;
        int days = (usersCount / 5) * 2 + usersCount;
        tournament.setStatus("started");
        tournament.setStartedDate(LocalDate.now());
        tournament.setFinishedDate(tournament.getStartedDate().plusDays(days));

        List<Round> roundList = generateRound(tournament);

        tournament.setRoundList(roundList);


    }

    @Transactional
    public void winnerResult(WinnerResult winnerResult, String name) {

        User userFromLogin = userService.findUserByLogin(name);
        User userFromDto = userService.findUserBySurnameAndName(winnerResult.getSurname(), winnerResult.getName());

        Tournament tournament = tournamentRepositories.findById(winnerResult.getTournamentId()).get();
//        LocalDate startedDate = tournament.getStartedDate();
        LocalDate now = LocalDate.now();
//        if (ChronoUnit.DAYS.between(startedDate, now) + 1 != winnerResult.getStage()) {
//            throw new TournamentException("You cannot change past/future details \n" +
//                    "Days between : " + ChronoUnit.DAYS.between(now, startedDate) + "\n" +
//                    "Stage : " + winnerResult.getStage());
//        }
        List<Match> matchList = tournament.getRoundList().get(winnerResult.getStage() - 1).getMatchList();


        for (Match m : matchList) {
            if(!m.getDate().equals(now)) {
                throw new TournamentException("You cannot change past/future details \n" +
                        "Stage : " + winnerResult.getStage());
            }
            if (m.getUser1().equals(userFromDto.getId()) || m.getUser2().equals(userFromDto.getId())) {
                if (m.getUser1().equals(userFromLogin.getId()) || m.getUser2().equals(userFromLogin.getId())) {
                    if (m.getWinner() != null) {

                        throw new TournamentException("Winner already exists");
                    }
                    m.setWinner(userFromDto.getId());
                    return;
                }
            }
        }
        throw new TournamentException("Error, Invalid data!");

    }

    @Transactional
    public TournamentBracketDto getDetailsTournamentBracket(Long id) {
        Tournament tournament = tournamentRepositories.findById(id).orElseThrow(() -> new TournamentException("Tournament not found"));
        TournamentBracketDto tournamentBracketDto = new TournamentBracketDto(tournament.getId(), tournament.getName(), tournament.getType(), tournament.getDescription());
        tournamentBracketDto.setStartedDate(tournament.getStartedDate().toString());
        tournamentBracketDto.setFinishedDate(tournament.getFinishedDate().toString());
        List<Round> rounds = tournament.getRoundList();
        List<RoundDto> roundDtos = new ArrayList<>();
        for (Round round : rounds) {
            RoundDto roundDto = new RoundDto(round.getStage());
            List<Match> matchList = round.getMatchList();
            List<MatchDto> matchDtos = new ArrayList<>();
            for (Match match : matchList) {
                MatchDto matchDto = new MatchDto();
                matchDto.setMatch_id(match.getId());
                matchDto.setUsername1(userService.getUserLogin(match.getUser1()));
                matchDto.setUsername2(userService.getUserLogin(match.getUser2()));
                if (match.getWinner() != null) {
                    matchDto.setWinner(userService.getUserLogin(match.getWinner()));
                }
                matchDtos.add(matchDto);
            }
            roundDto.setMatches(matchDtos);
            roundDtos.add(roundDto);
        }

        tournamentBracketDto.setRoundList(roundDtos);

        return tournamentBracketDto;
    }

    public TournamentFullDetailsDto getDetailsTournament(Long id) {
        Tournament tournament = tournamentRepositories.findById(id).get();
        TournamentFullDetailsDto tournamentFullDetailsDto = new TournamentFullDetailsDto(tournament.getId(), tournament.getName(),
                tournament.getType(), tournament.getDescription());
        List<User> users = (List<User>) tournament.getUsers();
        List<UserDto> collect = users.stream().map((u) -> new UserDto(u.getLogin(), u.getName(), u.getSurname(), u.getMajor())).collect(Collectors.toList());
        tournament.setAdminOwner(tournament.isAdminOwner());
        tournamentFullDetailsDto.setList(collect);
        return tournamentFullDetailsDto;

    }

    public List<RegisterTourneyDto> getRegisterTournaments(String status) {

        List<Tournament> tournaments = tournamentRepositories.findByStatus(status);
        LocalDate localDate = LocalDate.now();
        List<RegisterTourneyDto> list = new ArrayList<>();
        for (Tournament t : tournaments) {

            if (t.getFinishedDate() != null && ChronoUnit.DAYS.between(localDate, t.getFinishedDate()) <= 0) {
                t.setStatus("completed");
                continue;
            }
            RegisterTourneyDto registerTourneyDto = new RegisterTourneyDto();
            registerTourneyDto.setId(t.getId());
            registerTourneyDto.setName(t.getName());
            registerTourneyDto.setType(t.getType());
            registerTourneyDto.setParticipants(t.getUsers().size());
            registerTourneyDto.setDescription(t.getDescription());
            registerTourneyDto.setAdminOwner(t.isAdminOwner());
            list.add(registerTourneyDto);
        }
        return list;
    }

    public List<LeaderBoardDto> getLeaderBoard(Long id) {
        List<TempLeaderBoardDto> list = tournamentRepositories.getLeaderBoard(id);
        Tournament tournament = tournamentRepositories.findById(id).get();
        Collection<User> users = tournament.getUsers();
        List<LeaderBoardDto> leaderBoardDtoList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getWinner() == null) {
                continue;
            }

            User user = userService.findById(list.get(i).getWinner());
            users.remove(user);
            LeaderBoardDto leaderBoardDto = new LeaderBoardDto(user.getName(), user.getSurname(), list.get(i).getCount());
            leaderBoardDtoList.add(leaderBoardDto);
        }
        for (User u : users) {
            LeaderBoardDto leaderBoardDto = new LeaderBoardDto(u.getName(), u.getSurname(), 0L);
            leaderBoardDtoList.add(leaderBoardDto);
        }


        return leaderBoardDtoList;

    }

    public void deleteTournament(Long id) {
        Tournament tournament = tournamentRepositories.findById(id).orElseThrow(() -> new TournamentException("Tournament doesn't exists"));
        tournamentRepositories.deleteById(id);
    }
    @Transactional
    public void deletePlayerFromTournament(Long tournament_id, String player_name, String player_surname) {

        User user = userService.findUserBySurnameAndName(player_surname, player_name);
        if (user == null) {
            throw new UserException("user not found");//throw new UsernameNotFoundException("User not found");
        }
        Tournament tournament = tournamentRepositories.findById(tournament_id).orElseThrow(() -> new TournamentException("Tournament has not been found"));

        List<Round> roundList = tournament.getRoundList();
        for (Round r : roundList) {
            List<Match> matchList = r.getMatchList();
            for (Match m : matchList) {
                if (m.getWinner() == null) {
                    if (m.getUser1().equals(user.getId())) {
                        m.setWinner(m.getUser2());
                    }
                    if (m.getUser2().equals(user.getId())) {
                        m.setWinner(m.getUser1());
                    }
                }
            }
        }

    }

    @Transactional
    public void deleteUser(String userName, String userSurname) {
        User user = userService.findUserBySurnameAndName(userSurname, userName);
        if(user == null) {
            throw new UserException("user not found");
        }
        Collection<Tournament> tournaments = user.getTournaments();
        for (Tournament t : tournaments) {
            deletePlayerFromTournament(t.getId(), user.getName(), user.getSurname());
        }
        user.setSurname("deleted");
        user.setName("deleted");
        user.setPassword("rakhimtimkabimka");
        user.setMajor("deleted");
        userFactService.deleteBatch(user.getUserFacts());
        user.setUserFacts(null);
        userService.save(user);

    }

    @Transactional
    public void info(InfoDto infoDto, String feedbackerLogin) {
        User user = userService.findUserBySurnameAndName(infoDto.getSurname(), infoDto.getName());
        if (user == null) {
            throw new UserException("User not found");
        }
        User feedbacker = userService.findUserByLogin(feedbackerLogin);
        if (feedbacker == null) {
            throw new UserException("User not found");
        }
        if (user.getId().equals(feedbacker.getId())) {
            throw new TournamentException("You cannot add facts about yourself");
        }
        UserFact userFact = new UserFact();
        userFact.setFact(infoDto.getFact());
        userFact.setId_of_feedbacker(feedbacker.getId());
        userFact.setLearnedMaterial(infoDto.getDone());
        userFact.setUser(user);
        userFactService.save(userFact);
        user.getUserFacts().add(userFact);

    }

    @Transactional
    public List<Round> generateRound(Tournament tournament) {
        List<User> users = (List<User>) tournament.getUsers();
        Collections.shuffle(users);
        List<Round> roundList = new ArrayList<>();

        //adding bot
        User bot = new User();
        if (users.size() % 2 != 0) {
            bot.setMajor("BOT");
            users.add(bot);
        }

        int userCount = users.size();
        int day = 0;
        for (int i = 0; i < userCount - 1; i++) {
            Round round = new Round();
            round.setStage(i + 1);
            List<Match> matchList = new ArrayList<>();

            if(tournament.getStartedDate().plusDays(day).getDayOfWeek().equals(DayOfWeek.SATURDAY)) {
                day++;
            }
            if(tournament.getStartedDate().plusDays(day).getDayOfWeek().equals(DayOfWeek.SUNDAY)) {
                day++;
            }

            for (int j = 0; j < userCount / 2; j++) {
                //if bot then continue
                if (users.get(j).getMajor().equals(bot.getMajor()) || users.get(userCount - 1 - j).getMajor().equals(bot.getMajor())) {
                    continue;
                }

                Match match = new Match();

                match.setDate(tournament.getStartedDate().plusDays(day));
                match.setUser1(users.get(j).getId());
                match.setUser2(users.get(userCount - 1 - j).getId());
                match.setRound(round);
                matchList.add(match);
                matchService.save(match);


            }
            day++;
            round.setMatchList(matchList);
            round.setTournament(tournament);
            roundList.add(round);
            roundService.save(round);

            shuffleAlg(users);
        }
        //removing bot
        users.remove(bot);
        return roundList;
    }


    public List<User> shuffleAlg(List<User> list) {
        User temp = list.get(list.size() - 1);
        for (int i = list.size() - 1; i > 0; i--) {
            if (i == 1) {
                list.set(i, temp);
                break;
            }
            list.set(i, list.get(i - 1));
        }
        return list;
    }

    @Transactional
    public void updateMatchResult(String winnerName, String winnerSurname, Long matchId) {
        User user = userService.findUserBySurnameAndName(winnerSurname, winnerName);
        if(user == null) {
            throw new UserException("User has not been found");
        }
        Match match = matchService.getMatchById(matchId).orElseThrow(() -> new TournamentException("There is no such match"));
        match.setWinner(user.getId());
    }

//    @Transactional
//    public void getDetailsTournamentLeaderBoard(Long id) {
//       Tournament tournament = tournamentRepositories.findById(id).orElseThrow(()-> new TournamentException("Tournament has not been found"));
//       List<User> users = (List<User>) tournament.getUsers();
//       List<Round> rounds = tournament.getRoundList();
//
//       for (Round round : rounds) {
//            List<Match> matches = round.getMatchList();
//            for(Match match : matches) {
//                match.getWinner();
//            }
//       }
//    }


}

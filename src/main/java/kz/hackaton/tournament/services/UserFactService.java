package kz.hackaton.tournament.services;

import kz.hackaton.tournament.dto.TabloDto;
import kz.hackaton.tournament.entities.User;
import kz.hackaton.tournament.entities.UserFact;
import kz.hackaton.tournament.repositories.UserFactRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class UserFactService {

    private final UserFactRepository userFactRepository;
    private final UserService userService;


    public void save(UserFact userFact) {
        userFactRepository.save(userFact);
    }

    public void deleteBatch(List<UserFact> list) {
        userFactRepository.deleteAllInBatch(list);
    }

    @Transactional
    public List<TabloDto> findLastTenRow() {
        List<UserFact> lastTenRow = userFactRepository.findLastTenRow();
        List<TabloDto> list = new ArrayList<>();
        for(UserFact u : lastTenRow) {
            TabloDto tabloDto = new TabloDto();
            User user = userService.findById(u.getUser().getId());
            User feedback = userService.findById(u.getId_of_feedbacker());
            tabloDto.setName(user.getName());
            tabloDto.setSurname(user.getSurname());
            tabloDto.setAuthorName(feedback.getName());
            tabloDto.setAuthorSurname(feedback.getSurname());
            tabloDto.setFact(u.getFact());
            tabloDto.setDone(u.getLearnedMaterial());
            list.add(tabloDto);
        }
        return list;
    }

}

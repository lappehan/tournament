package kz.hackaton.tournament.controllers;

import kz.hackaton.tournament.dto.TabloDto;
import kz.hackaton.tournament.services.MatchService;
import kz.hackaton.tournament.services.UserFactService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tablo")
@RequiredArgsConstructor
public class TabloController {

    private final UserFactService userFactService;

    @GetMapping
    public List<TabloDto> getTablo() {
        return userFactService.findLastTenRow();
    }

}


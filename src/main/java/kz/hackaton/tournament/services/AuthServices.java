package kz.hackaton.tournament.services;

import kz.hackaton.tournament.controllers.UserDTO;
import kz.hackaton.tournament.entities.User;
import kz.hackaton.tournament.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServices {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;


    public void registration(UserDTO userDTO) {
       if(userRepository.findUserByLogin(userDTO.getUsername()).isPresent()) {
           throw new RuntimeException("user already exist");
       }
        User user = new User();
       user.setName(userDTO.getUsername());
       user.setPassword(userDTO.getPassword());
        userRepository.save(user);
    }

    public void authentification(UserDTO userDTO) {
       UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDTO.getUsername(),userDTO.getPassword());
        Authentication authenticate = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authenticate);
    }
}

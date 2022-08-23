package kz.hackaton.tournament.controllers;

import kz.hackaton.tournament.dto.JwtRequest;
import kz.hackaton.tournament.dto.JwtResponse;
import kz.hackaton.tournament.responses.BodyResponse;
import kz.hackaton.tournament.responses.ResponseMessage;
import kz.hackaton.tournament.services.UserService;
import kz.hackaton.tournament.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;


    @PostMapping("/auth")
    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getLogin(), authRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new ResponseMessage( "Incorrect username or password",HttpStatus.UNAUTHORIZED.value()), HttpStatus.UNAUTHORIZED);
        }
        UserDetails userDetails = userService.loadUserByUsername(authRequest.getLogin());
        String token = jwtTokenUtil.generateToken(userDetails);
        List<String> roles = jwtTokenUtil.getRoles(token);

        return ResponseEntity.ok(new JwtResponse(token, roles));
    }

    @PostMapping("/register")
    public BodyResponse register(@RequestBody JwtRequest jwtRequest) {
        return userService.register(jwtRequest);
    }


}

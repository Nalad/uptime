package com.notenoughviolence.pompom.controller;


import com.notenoughviolence.pompom.domain.ApplicationUser;
import com.notenoughviolence.pompom.repository.ApplicationUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private ApplicationUserRepository applicationUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(ApplicationUserRepository applicationUserRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/sign-up")
    public ResponseEntity signUp(@RequestBody ApplicationUser user) {
        if (applicationUserRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        applicationUserRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}

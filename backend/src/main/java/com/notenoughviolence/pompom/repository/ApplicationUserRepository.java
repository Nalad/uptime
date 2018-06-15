package com.notenoughviolence.pompom.repository;

import com.notenoughviolence.pompom.domain.ApplicationUser;
import com.notenoughviolence.pompom.domain.Check;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {

    ApplicationUser findByUsername(String username);
}

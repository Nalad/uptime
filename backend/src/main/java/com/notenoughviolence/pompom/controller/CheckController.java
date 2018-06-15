package com.notenoughviolence.pompom.controller;

import com.notenoughviolence.pompom.domain.ApplicationUser;
import com.notenoughviolence.pompom.domain.Check;
import com.notenoughviolence.pompom.domain.CheckId;
import com.notenoughviolence.pompom.repository.ApplicationUserRepository;
import com.notenoughviolence.pompom.service.CheckService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CheckController {

    private ApplicationUserRepository applicationUserRepository;
    private CheckService checkService;

    public CheckController(ApplicationUserRepository applicationUserRepository, CheckService checkService) {
        this.applicationUserRepository = applicationUserRepository;
        this.checkService = checkService;
    }

    @RequestMapping(value = "/checks", method = RequestMethod.POST)
    public void updateCheck(@RequestBody Check check, Principal principal) throws NoSuchMethodException {
        ApplicationUser user = applicationUserRepository.findByUsername(principal.getName());
        check.setCheckId(new CheckId(user, check.getCheckId().getName()));
        checkService.save(check);
    }

    @RequestMapping(value = "/checks", method = RequestMethod.GET)
    public List<Check> getChecks(Principal principal) {
        ApplicationUser user = applicationUserRepository.findByUsername(principal.getName());
        return checkService.getAllOfGivenUser(user);
    }

}

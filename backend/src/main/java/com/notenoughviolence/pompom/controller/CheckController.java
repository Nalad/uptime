package com.notenoughviolence.pompom.controller;

import com.notenoughviolence.pompom.domain.Check;
import com.notenoughviolence.pompom.domain.CheckProxy;
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

    private CheckService checkService;

    public CheckController(CheckService checkService) {
        this.checkService = checkService;
    }

    @RequestMapping(value = "/checks", method = RequestMethod.POST)
    public void updateCheck(@RequestBody Check check, Principal principal) {
        checkService.save(check, principal);
    }

    @RequestMapping(value = "/checks", method = RequestMethod.GET)
    public List<CheckProxy> getChecks(Principal principal) {
        return checkService.getAllOfGivenUser(principal);
    }
}

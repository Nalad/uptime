package com.notenoughviolence.pompom.service;

import com.notenoughviolence.pompom.domain.Check;
import com.notenoughviolence.pompom.domain.CheckProxy;

import java.security.Principal;
import java.util.List;

public interface CheckService {

    void save(Check check, Principal principal);

    List<CheckProxy> getAllOfGivenUser(Principal principal);

    void delete(Check check, Principal principal);
}

package com.notenoughviolence.pompom.service;

import com.notenoughviolence.pompom.domain.ApplicationUser;
import com.notenoughviolence.pompom.domain.Check;

import java.util.List;

public interface CheckService {

    void save(Check check) throws NoSuchMethodException;

    List<Check> getAllOfGivenUser(ApplicationUser user);
}

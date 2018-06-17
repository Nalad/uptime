package com.notenoughviolence.pompom.repository;

import com.notenoughviolence.pompom.domain.Check;
import com.notenoughviolence.pompom.domain.CheckId;
import org.springframework.data.repository.CrudRepository;

public interface CheckRepository extends CrudRepository<Check, CheckId> {
}

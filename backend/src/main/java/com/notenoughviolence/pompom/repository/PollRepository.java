package com.notenoughviolence.pompom.repository;

import com.notenoughviolence.pompom.domain.Poll;
import org.springframework.data.repository.CrudRepository;

public interface PollRepository extends CrudRepository<Poll, Long> {
}

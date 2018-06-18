package com.notenoughviolence.pompom.repository;

import com.notenoughviolence.pompom.domain.Check;
import com.notenoughviolence.pompom.domain.Poll;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PollRepository extends CrudRepository<Poll, Long> {

    List<Poll> findAllByChk(Check chk);

    void deleteAllByChk(Check chk);
}

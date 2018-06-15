package com.notenoughviolence.pompom.service;

import com.notenoughviolence.pompom.Utilities;
import com.notenoughviolence.pompom.domain.Availability;
import com.notenoughviolence.pompom.domain.Check;
import com.notenoughviolence.pompom.domain.Poll;
import com.notenoughviolence.pompom.repository.PollRepository;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.LocalDateTime;

@Service
public class PollServiceImpl implements PollService {

    private final int TIMEOUT = 5000;

    private PollRepository pollRepository;

    public PollServiceImpl(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    @Override
    public void pollGivenCheck(Check check) {
        Availability availability = Utilities.pingURL(check.getUri(), TIMEOUT);

        Poll poll = new Poll(check, availability, LocalDateTime.now(Clock.systemUTC()));

        pollRepository.save(poll);
    }
}

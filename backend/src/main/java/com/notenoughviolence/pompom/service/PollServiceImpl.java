package com.notenoughviolence.pompom.service;

import com.notenoughviolence.pompom.Utilities;
import com.notenoughviolence.pompom.domain.Availability;
import com.notenoughviolence.pompom.domain.Check;
import com.notenoughviolence.pompom.domain.Poll;
import com.notenoughviolence.pompom.repository.CheckRepository;
import com.notenoughviolence.pompom.repository.PollRepository;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.LocalDateTime;

@Service
public class PollServiceImpl implements PollService {

    private final int TIMEOUT = 5000;

    private PollRepository pollRepository;
    private CheckRepository checkRepository;

    public PollServiceImpl(PollRepository pollRepository, CheckRepository checkRepository) {
        this.pollRepository = pollRepository;
        this.checkRepository = checkRepository;
    }

    @Override
    public void pollGivenCheck(Check chk) {
        Availability availability = Utilities.pingURL(chk.getUri(), TIMEOUT);

        pollRepository.save(new Poll(availability, LocalDateTime.now(Clock.systemUTC()), chk));
    }
}

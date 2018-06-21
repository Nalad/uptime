package com.notenoughviolence.pompom.service;

import com.google.common.base.Stopwatch;
import com.notenoughviolence.pompom.CustomScheduler;
import com.notenoughviolence.pompom.Utilities;
import com.notenoughviolence.pompom.domain.Availability;
import com.notenoughviolence.pompom.domain.Check;
import com.notenoughviolence.pompom.domain.Poll;
import com.notenoughviolence.pompom.repository.PollRepository;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Service
public class PollServiceImpl implements PollService {

    private final int TIMEOUT = 5000;

    private PollRepository pollRepository;
    private CustomScheduler customScheduler;

    public PollServiceImpl(PollRepository pollRepository, CustomScheduler customScheduler) {
        this.pollRepository = pollRepository;
        this.customScheduler = customScheduler;
    }

    @Override
    public void pollGivenCheck(Check chk) {
        Stopwatch stopwatch = Stopwatch.createStarted();
        Availability availability = Utilities.pingURL(chk.getUri(), TIMEOUT);
        stopwatch.stop();

        ScheduledFuture<?> lock = customScheduler.getScheduledPoller(chk.getCheckId());
        if (lock == null) return;
        synchronized (lock) {
            // We check for the second time, because between getting lock object and
            // synchronizing on him, it can be removed from the map of scheduled tasks,
            // that is indicating the chk was removed from db
            if (customScheduler.getScheduledPoller(chk.getCheckId()) == null) return;
            pollRepository.save(new Poll(
                    availability,
                    ZonedDateTime.now(Clock.systemUTC()),
                    stopwatch.elapsed(TimeUnit.MILLISECONDS),
                    chk
            ));
        }
    }
}

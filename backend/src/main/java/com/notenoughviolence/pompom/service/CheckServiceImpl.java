package com.notenoughviolence.pompom.service;

import com.notenoughviolence.pompom.PollTask;
import com.notenoughviolence.pompom.CustomScheduler;
import com.notenoughviolence.pompom.domain.ApplicationUser;
import com.notenoughviolence.pompom.domain.Check;
import com.notenoughviolence.pompom.repository.CheckRepository;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.ScheduledMethodRunnable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ScheduledFuture;

@Service
public class CheckServiceImpl implements CheckService {

    private CheckRepository checkRepository;
    private CustomScheduler customScheduler;
    private TaskScheduler taskScheduler;
    private PollService pollService;

    public CheckServiceImpl(CheckRepository checkRepository, CustomScheduler customScheduler, TaskScheduler taskScheduler, PollService pollService) {
        this.checkRepository = checkRepository;
        this.customScheduler = customScheduler;
        this.taskScheduler = taskScheduler;
        this.pollService = pollService;
    }

    public void save(Check check) throws NoSuchMethodException {
        ScheduledFuture<?> scheduledFuture = customScheduler.getScheduledTasks().get(check.getCheckId());
        if (scheduledFuture != null) scheduledFuture.cancel(false);
        checkRepository.save(check);
        taskScheduler.scheduleAtFixedRate(new ScheduledMethodRunnable(
                new PollTask(check, pollService), "startPolling"),
                check.getInterval());
    }

    public List<Check> getAllOfGivenUser(ApplicationUser user) {
        return user.getChecks();
    }
}

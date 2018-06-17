package com.notenoughviolence.pompom.service;

import com.notenoughviolence.pompom.CustomScheduler;
import com.notenoughviolence.pompom.PollTask;
import com.notenoughviolence.pompom.domain.ApplicationUser;
import com.notenoughviolence.pompom.domain.Check;
import com.notenoughviolence.pompom.domain.CheckProxy;
import com.notenoughviolence.pompom.repository.ApplicationUserRepository;
import com.notenoughviolence.pompom.repository.PollRepository;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.ScheduledMethodRunnable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CheckServiceImpl implements CheckService {

    private ApplicationUserRepository applicationUserRepository;
    private CustomScheduler customScheduler;
    private TaskScheduler taskScheduler;
    private PollRepository pollRepository;
    private PollService pollService;

    public CheckServiceImpl(ApplicationUserRepository applicationUserRepository, CustomScheduler customScheduler, TaskScheduler taskScheduler, PollRepository pollRepository, PollService pollService) {
        this.applicationUserRepository = applicationUserRepository;
        this.customScheduler = customScheduler;
        this.taskScheduler = taskScheduler;
        this.pollRepository = pollRepository;
        this.pollService = pollService;
    }

    public void save(Check check, Principal principal) {
        ApplicationUser user = applicationUserRepository.findByUsername(principal.getName());

        check.getCheckId().setUserId(user);

        customScheduler.cancelScheduledPolling(check.getCheckId());

        user.removeCheck(check);
        user.addCheck(check);

        applicationUserRepository.save(user);

        try {
            taskScheduler.scheduleAtFixedRate(new ScheduledMethodRunnable(
                            new PollTask(check, pollService), "startPolling"),
                    check.getInterval());
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
    }

    public List<CheckProxy> getAllOfGivenUser(Principal principal) {
        ApplicationUser user = applicationUserRepository.findByUsername(principal.getName());
        List<CheckProxy> toSerialize = new ArrayList<>();
        for (Check check : user.getChecks()) {
            toSerialize.add(new CheckProxy(check, pollRepository.findAllByChk(check)));
        }
        return toSerialize;
    }
}

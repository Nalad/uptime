package com.notenoughviolence.pompom;

import com.notenoughviolence.pompom.domain.Check;
import com.notenoughviolence.pompom.service.PollService;

public class PollTask {

    private final Check check;
    private final PollService pollService;

    public PollTask(Check check, PollService pollService) {
        this.check = check;
        this.pollService = pollService;
    }

    public Check getCheck() {
        return check;
    }

    public void startPolling() {
        pollService.pollGivenCheck(check);
    }
}

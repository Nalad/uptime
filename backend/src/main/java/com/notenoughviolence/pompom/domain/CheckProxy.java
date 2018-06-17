package com.notenoughviolence.pompom.domain;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

import java.util.List;

public class CheckProxy {

    @JsonUnwrapped
    private final Check check;

    private final List<Poll> polls;

    public CheckProxy(Check check, List<Poll> polls) {
        this.check = check;
        this.polls = polls;
    }

    public Check getCheck() {
        return check;
    }

    public List<Poll> getPolls() {
        return polls;
    }
}

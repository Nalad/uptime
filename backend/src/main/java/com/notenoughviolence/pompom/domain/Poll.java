package com.notenoughviolence.pompom.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Entity(name = "PollEntity")
@Table(name = "poll_table")
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    private Availability availability;

    private ZonedDateTime time;

    private Long latency;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Check chk;

    public Poll() {
    }

    public Poll(Availability availability, ZonedDateTime time, Long latency, Check chk) {
        this.availability = availability;
        this.time = time;
        this.latency = latency;
        this.chk = chk;
    }

    public Availability getAvailability() {
        return availability;
    }

    public void setAvailability(Availability availability) {
        this.availability = availability;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Check getChk() {
        return chk;
    }

    public void setChk(Check chk) {
        this.chk = chk;
    }

    public Long getLatency() {
        return latency;
    }

    public void setLatency(Long latency) {
        this.latency = latency;
    }
}

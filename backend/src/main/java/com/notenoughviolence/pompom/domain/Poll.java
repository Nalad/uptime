package com.notenoughviolence.pompom.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "PollEntity")
@Table(name = "poll_table")
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    private Availability availability;

    private LocalDateTime time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Check chk;

    public Poll() {
    }

    public Poll(Availability availability, LocalDateTime time, Check chk) {
        this.availability = availability;
        this.time = time;
        this.chk = chk;
    }

    public Availability getAvailability() {
        return availability;
    }

    public void setAvailability(Availability availability) {
        this.availability = availability;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
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
}

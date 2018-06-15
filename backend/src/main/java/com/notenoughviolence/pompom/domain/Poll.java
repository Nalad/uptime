package com.notenoughviolence.pompom.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @ManyToOne
    @JsonIgnore
    private Check check;

    private Availability availability;

    private LocalDateTime time;

    public Poll() {
    }

    public Poll(Check check, Availability availability, LocalDateTime time) {
        this.check = check;
        this.availability = availability;
        this.time = time;
    }

    public Check getCheck() {
        return check;
    }

    public void setCheck(Check check) {
        this.check = check;
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
}

package com.notenoughviolence.pompom.domain;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "checks_table")
public class Check {

    @EmbeddedId
    @JsonUnwrapped
    private CheckId checkId;

    private String uri;

    private Integer interval;

    @OneToMany(mappedBy = "check")
    private Set<Poll> polls;

    public CheckId getCheckId() {
        return checkId;
    }

    public void setCheckId(CheckId checkId) {
        this.checkId = checkId;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public Integer getInterval() {
        return interval;
    }

    public void setInterval(Integer interval) {
        this.interval = interval;
    }

    public Set<Poll> getPolls() {
        return polls;
    }

    public void setPolls(Set<Poll> polls) {
        this.polls = polls;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Check check = (Check) o;
        return Objects.equals(checkId, check.checkId);
    }

    @Override
    public int hashCode() {

        return Objects.hash(checkId);
    }

    @Override
    public String toString() {
        return "Check{" +
                "checkId=" + checkId +
                ", uri='" + uri + '\'' +
                ", interval=" + interval +
                '}';
    }
}

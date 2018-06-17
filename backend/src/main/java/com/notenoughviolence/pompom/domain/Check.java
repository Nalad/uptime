package com.notenoughviolence.pompom.domain;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.google.common.base.Objects;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity(name = "CheckEntity")
@Table(name = "check_table")
public class Check {

    @EmbeddedId
    @JsonUnwrapped
    private CheckId checkId;

    private String uri;

    private Integer interval;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Check check = (Check) o;
        return Objects.equal(checkId, check.checkId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(checkId);
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

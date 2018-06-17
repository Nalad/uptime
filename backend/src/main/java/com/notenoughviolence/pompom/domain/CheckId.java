package com.notenoughviolence.pompom.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class CheckId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "user_id_id")
    @JsonIgnore
    private ApplicationUser userId;

    private String name;

    public CheckId() {
    }

    public CheckId(ApplicationUser userId, String name) {
        this.userId = userId;
        this.name = name;
    }

    public ApplicationUser getUserId() {
        return userId;
    }

    public void setUserId(ApplicationUser userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CheckId checkId = (CheckId) o;
        return com.google.common.base.Objects.equal(userId, checkId.userId) &&
                com.google.common.base.Objects.equal(name, checkId.name);
    }

    @Override
    public int hashCode() {
        return com.google.common.base.Objects.hashCode(userId, name);
    }

    @Override
    public String toString() {
        return "CheckId{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                '}';
    }
}

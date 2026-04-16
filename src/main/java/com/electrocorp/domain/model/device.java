package com.electrocorp.domain.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class device {

    private String id;
    private String name;
    private boolean isOn;

    public device(String id, String name) {
        this.id = id;
        this.name = name;
        this.isOn = false;
    }

    public void turnOn() {
        this.isOn = true;
    }

    public void turnOff() {
        this.isOn = false;
    }
}
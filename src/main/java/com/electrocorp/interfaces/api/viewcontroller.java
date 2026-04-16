package com.electrocorp.interfaces.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class viewcontroller {

    @GetMapping("/")
    public String home() {
        return "CentroEnergetico";
    }
}
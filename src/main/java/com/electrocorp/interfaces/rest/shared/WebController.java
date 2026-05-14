package com.electrocorp.interfaces.rest.shared;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String redirectToApp() {
        return "redirect:/app/index.html";
    }
}
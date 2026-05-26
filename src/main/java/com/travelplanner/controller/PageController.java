package com.travelplanner.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @GetMapping("/search")
    public String search() {
        return "search";
    }

    @GetMapping("/results")
    public String results() {
        return "results";
    }

    @GetMapping("/trip-summary")
    public String tripSummary() {
        return "trip-summary";
    }

    @GetMapping("/reviews")
    public String reviews() {
        return "reviews";
    }
}

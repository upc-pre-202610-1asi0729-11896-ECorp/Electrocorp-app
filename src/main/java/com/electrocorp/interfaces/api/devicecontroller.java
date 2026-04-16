package com.electrocorp.interfaces.api;

import com.electrocorp.application.usecase.*;
import com.electrocorp.domain.model.*;
import com.electrocorp.infrastructure.persistence.inmemoryenergyrepository;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class devicecontroller {

    private final home home = new home("home-1");
    private final inmemoryenergyrepository repo = new inmemoryenergyrepository();

    private final turndeviceusecase turnDevice = new turndeviceusecase();
    private final addenergyreadingusecase addReading = new addenergyreadingusecase(repo);
    private final getdashboardusecase dashboard = new getdashboardusecase(repo);

    public devicecontroller() {
        home.addDevice(new device("1", "Televisor"));
        home.addDevice(new device("2", "Refrigeradora"));
    }

    @PostMapping("/device/{id}/on")
    public device turnOn(@PathVariable String id) {
        return turnDevice.execute(home, id, true);
    }

    @PostMapping("/device/{id}/off")
    public device turnOff(@PathVariable String id) {
        return turnDevice.execute(home, id, false);
    }

    @PostMapping("/energy")
    public Object addEnergy(@RequestParam double kwh,
                            @RequestParam double costPerKwh) {
        return addReading.execute("home-1", kwh, costPerKwh);
    }

    @GetMapping("/dashboard")
    public Object dashboard() {
        return dashboard.execute("home-1");
    }
}
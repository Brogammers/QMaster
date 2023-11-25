package com.que.que.Registration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// This endpoint is not set yet. It was used in the example and will be changed later on.
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {

    private RegistrationService registrationService;
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }
}

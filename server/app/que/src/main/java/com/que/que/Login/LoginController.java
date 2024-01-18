package com.que.que.Login;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import lombok.AllArgsConstructor;

// This endpoint is not set yet. It was used in the example and will be changed
// later on.
// splandamedia.com/api/v1/registration'
@RestController
@RequestMapping(path = "api/v1/login")
@AllArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping
    public Map<String, Object> login(@RequestBody LoginRequest request) {
        return loginService.loginUser(request.getEmail(), request.getPassword());
    }
}

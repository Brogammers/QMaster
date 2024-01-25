package com.que.que.Registration;

import lombok.AllArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
// This endpoint is not set yet. It was used in the example and will be changed
// later on.
// splandamedia.com/api/v1/registration
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {

  private RegistrationService registrationService;

  @PostMapping
  public ResponseEntity<Object> register(@RequestBody RegistrationRequest request) {
    Map<String, Object> body = new HashMap<>();
    HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
    try {
      String token = registrationService.register(request);
      body.put("confirmation-token", token);
      body.put("message", "Registered!");
    } catch (IllegalStateException e) {
      body.put("message", e.getMessage());
      statusCode = HttpStatusCode.valueOf(500);
    }
    return new ResponseEntity<Object>(body, statusCode);
  }

  @GetMapping(path = "confirm")
  public ResponseEntity<Object> confirm(@RequestParam("token") String token) {
    Map<String, Object> body = new HashMap<>();
    HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
    try {
      registrationService.confirmToken(token);
      body.put("message", "Confirmed user");
    } catch (IllegalStateException e) {
      body.put("message", e.getMessage());
      statusCode = HttpStatusCode.valueOf(500);
    }
    return new ResponseEntity<Object>(body, statusCode);
  }
}

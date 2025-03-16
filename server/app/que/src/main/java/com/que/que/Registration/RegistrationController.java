package com.que.que.Registration;

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

import com.que.que.Partner.Partner;
import com.que.que.Partner.PartnerService;

import lombok.AllArgsConstructor;

@RestController
// This endpoint is not set yet. It was used in the example and will be changed
// later on.
// splandamedia.com/api/v1/registration
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {

  private RegistrationService registrationService;
  private PartnerService partnerService;

  @PostMapping(path = "/user")
  public ResponseEntity<Object> register(@RequestBody AppUserRegistrationRequest request) {
    Map<String, Object> body = new HashMap<>();
    HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
    try {
      String token = registrationService.registarAppUser(request);
      body.put("confirmation-token", token);
      body.put("message", "Registered!");
    } catch (IllegalStateException e) {
      body.put("message", e.getMessage());
      statusCode = HttpStatusCode.valueOf(500);
    }
    return new ResponseEntity<Object>(body, statusCode);
  }

  @PostMapping(path = "/business")
  public ResponseEntity<Object> register(@RequestBody BusinessUserRegistrationRequest request) {
    Map<String, Object> body = new HashMap<>();
    HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
    try {
      String token = registrationService.registerBusinessUser(request);
      body.put("confirmation-token", token);
      body.put("message", "Registered!");
    } catch (IllegalStateException e) {
      body.put("message", e.getMessage());
      statusCode = HttpStatusCode.valueOf(500);
    }
    return new ResponseEntity<Object>(body, statusCode);
  }

  @PostMapping("/admin")
  public ResponseEntity<Object> register(@RequestBody AdminUserRegistrationRequest request) {
    Map<String, Object> body = new HashMap<>();
    HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
    try {
      String token = registrationService.registerAdminUser(request);
      body.put("confirmation-token", token);
      body.put("message", "Registered!");
    } catch (IllegalStateException e) {
      body.put("message", e.getMessage());
      statusCode = HttpStatusCode.valueOf(500);
    }
    return new ResponseEntity<Object>(body, statusCode);
  }

  @PostMapping("/partner")
  public ResponseEntity<Object> register(@RequestBody PartnerRegisterRequest request) {
    Map<String, Object> body = new HashMap<>();
    HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
    try {
      Partner partner = partnerService.createPartner(request.getName(), request.getCategory(), request.getLocations());
      body.put("message", "Registered!");
      body.put("partner", partner);
    } catch (IllegalStateException e) {
      body.put("message", e.getMessage());
      statusCode = HttpStatusCode.valueOf(500);
    }
    return new ResponseEntity<Object>(body, statusCode);
  }

  @GetMapping(path = "/confirm")
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

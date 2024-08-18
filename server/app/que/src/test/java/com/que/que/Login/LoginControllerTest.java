package com.que.que.Login;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

import static org.mockito.Mockito.*;

public class LoginControllerTest {

    @Mock
    private LoginService loginService;

    @InjectMocks
    private LoginController loginController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test()
    @Timeout(5000)
    public void testLogin_Success() {
        // Arrange
        LoginRequest request = new LoginRequest("test@example.com", "password");
        Map<String, Object> expectedBody = new HashMap<>();
        expectedBody.put("message", "Login successful");

        when(loginService.loginUser(request.getEmail(), request.getPassword())).thenReturn(expectedBody);

        // Act
        ResponseEntity<Object> response = loginController.loginUser(request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedBody, response.getBody());
        verify(loginService, times(1)).loginUser(request.getEmail(), request.getPassword());
    }

    @Test()
    @Timeout(5000)
    public void testLogin_Exception() {
        // Arrange
        LoginRequest request = new LoginRequest("test@example.com", "password");
        String errorMessage = "Internal Server Error";
        Map<String, Object> expectedBody = new HashMap<>();
        expectedBody.put("message", errorMessage);

        when(loginService.loginUser(request.getEmail(), request.getPassword()))
                .thenThrow(new IllegalStateException(errorMessage));

        // Act
        ResponseEntity<Object> response = loginController.loginUser(request);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(expectedBody, response.getBody());
        verify(loginService, times(1)).loginUser(request.getEmail(), request.getPassword());
    }
}
package com.que.que.Login;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
/**
 * A class that provides static methods for creating and configuring mock objects.
 * This class is part of the Mockito framework, which is a popular Java mocking framework used for unit testing.
 * It allows developers to create mock objects that simulate the behavior of real objects, making it easier to test code in isolation.
 * The static methods in this class can be used to create mock objects, define their behavior, and verify interactions with them.
 * For more information on how to use Mockito, refer to the official documentation.
 */
import static org.mockito.Mockito.*;

public class LoginControllerTest {

    @Mock
    private LoginService loginService;

    @InjectMocks
    private LoginController loginController;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testLogin_Success() {
        // Arrange
        LoginRequest request = new LoginRequest("test@example.com", "password");
        Map<String, Object> expectedBody = new HashMap<>();
        expectedBody.put("message", "Login successful");

        when(loginService.loginUser(request.getEmail(), request.getPassword())).thenReturn(expectedBody);

        // Act
        ResponseEntity<Object> response = loginController.login(request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedBody, response.getBody());
        verify(loginService, times(1)).loginUser(request.getEmail(), request.getPassword());
    }

    @Test
    public void testLogin_Exception() {
        // Arrange
        LoginRequest request = new LoginRequest("test@example.com", "password");
        String errorMessage = "Internal Server Error";
        Map<String, Object> expectedBody = new HashMap<>();
        expectedBody.put("message", errorMessage);

        when(loginService.loginUser(request.getEmail(), request.getPassword()))
                .thenThrow(new IllegalStateException(errorMessage));

        // Act
        ResponseEntity<Object> response = loginController.login(request);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(expectedBody, response.getBody());
        verify(loginService, times(1)).loginUser(request.getEmail(), request.getPassword());
    }
}
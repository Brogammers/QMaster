package com.que.que.Login;

import com.que.que.Registration.EmailValidator;
import com.que.que.Security.JwtUtil;
import com.que.que.User.AppUser;
import com.que.que.User.AppUserRepository;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class LoginServiceTest {

    private LoginService loginService;

    @Mock
    private AppUserRepository appUserRepository;

    @Mock
    private EmailValidator emailValidator;

    @Mock
    private LoginRepository loginRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        loginService = new LoginService(appUserRepository, emailValidator, loginRepository, bCryptPasswordEncoder);
    }

    /**
     * Test case to verify the login functionality with valid credentials.
     */
    @Test
    public void testLoginUser_ValidCredentials() {
        // Arrange
        String email = "test@example.com";
        String password = "password";
        AppUser user = new AppUser();
        // ...

        user.setEmail(email);
        user.setPassword(bCryptPasswordEncoder.encode(password));
        user.setEnabled(true);

        when(emailValidator.test(email)).thenReturn(true);
        when(appUserRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(bCryptPasswordEncoder.matches(password, user.getPassword())).thenReturn(true);
        String token = JwtUtil.generateToken(user.getEmail());

        // Act
        Map<String, Object> result = loginService.loginUser(email, password);

        // Assert
        assertNotNull(result);
        assertEquals(email, result.get("email"));
        assertEquals(user.getUsername(), result.get("username"));
        assertEquals(user.getId(), result.get("userID"));
        assertEquals(user.getFirstName(), result.get("firstName"));
        assertEquals(user.getLastName(), result.get("lastName"));
        assertEquals(token, result.get("token"));
        verify(loginRepository, times(1)).save(any(LoginEntry.class));
    }

    @Test(expected = IllegalStateException.class)
    public void testLoginUser_InvalidEmail() {
        // Arrange
        String email = "invalid_email";
        String password = "password";
        when(emailValidator.test(email)).thenReturn(false);

        // Act
        loginService.loginUser(email, password);

        // Assert
        // Expecting IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class)
    public void testLoginUser_UserNotFound() {
        // Arrange
        String email = "test@example.com";
        String password = "password";
        when(emailValidator.test(email)).thenReturn(true);
        when(appUserRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act
        loginService.loginUser(email, password);

        // Assert
        // Expecting IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class)
    public void testLoginUser_InvalidPassword() {
        // Arrange
        String email = "test@example.com";
        String password = "password";
        AppUser user = new AppUser();
        user.setEmail(email);
        user.setPassword(bCryptPasswordEncoder.encode("wrong_password"));
        when(emailValidator.test(email)).thenReturn(true);
        when(appUserRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(bCryptPasswordEncoder.matches(password, user.getPassword())).thenReturn(false);

        // Act
        loginService.loginUser(email, password);

        // Assert
        // Expecting IllegalStateException to be thrown
    }
}
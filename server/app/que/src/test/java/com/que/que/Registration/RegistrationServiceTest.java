package com.que.que.Registration;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.que.que.Email.EmailSender;
import com.que.que.Registration.Token.ConfirmationTokenService;
import com.que.que.Security.PasswordValidator;
import com.que.que.User.AppUser.AppUserService;

import java.util.HashSet;

import static org.mockito.Mockito.*;

public class RegistrationServiceTest {

    private RegistrationService registrationService;

    @Mock
    private AppUserService appUserService;

    @Mock
    private EmailValidator emailValidator;

    @Mock
    private ConfirmationTokenService confirmationTokenService;

    @Mock
    private PasswordValidator passwordValidator;

    @Mock
    private EmailSender emailSender;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        registrationService = new RegistrationService(
                appUserService,
                emailValidator,
                confirmationTokenService,
                passwordValidator,
                emailSender,
                new HashSet<>());
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testRegister_InvalidPassword_ThrowsIllegalStateException() {
        // Arrange
        String email = "test@example.com";
        String password = "123";
        String confirmPassword = "123";
        RegistrationRequest request = new RegistrationRequest("Test", "Testerson", null, "USA", password, email, "test",
                confirmPassword, "+1", "1234567890");

        when(emailValidator.test(request.getEmail())).thenReturn(true);
        when(passwordValidator.test(request.getPassword())).thenReturn(false);

        // Act
        registrationService.registerAppUser(request);

        // Assert
        // Expects IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testRegister_InvalidEmail1_ThrowsIllegalStateException() {
        // Arrange
        String email = "xample.com";
        String password = "Abcdefg1";
        String confirmPassword = "Abcdefg1";
        RegistrationRequest request = new RegistrationRequest("Test", "Testerson", null, "USA", password, email, "test",
                confirmPassword, "+1", "1234567890");

        when(emailValidator.test(request.getEmail())).thenReturn(false);

        // Act
        registrationService.registerAppUser(request);

        // Assert
        // Expects IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testRegister_InvalidEmail2_ThrowsIllegalStateException() {
        // Arrange
        String email = "email@.com";
        String password = "Abcdefg1";
        String confirmPassword = "Abcdefg1";
        RegistrationRequest request = new RegistrationRequest("Test", "Testerson", null, "USA", password, email, "test",
                confirmPassword, "+1", "1234567890");

        when(emailValidator.test(request.getEmail())).thenReturn(false);

        // Act
        registrationService.registerAppUser(request);

        // Assert
        // Expects IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testRegister_InvalidEmail3_ThrowsIllegalStateException() {
        // Arrange
        String email = "@meial.com";
        String password = "Abcdefg1";
        String confirmPassword = "Abcdefg1";
        RegistrationRequest request = new RegistrationRequest("Test", "Testerson", null, "USA", password, email, "test",
                confirmPassword, "+1", "1234567890");

        when(emailValidator.test(request.getEmail())).thenReturn(false);

        // Act
        registrationService.registerAppUser(request);

        // Assert
        // Expects IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testRegister_PasswordsDoNotMatch_ThrowsIllegalStateException() {
        // Arrange
        String email = "test@example.com";
        String password = "Abcdasf1";
        String confirmPassword = "Abcdefg1";
        RegistrationRequest request = new RegistrationRequest("Test", "Testerson", null, "USA", password, email, "test",
                confirmPassword, "+1", "1234567890");

        // Act
        registrationService.registerAppUser(request);

        // Assert
        // Expects IllegalStateException to be thrown
    }

}
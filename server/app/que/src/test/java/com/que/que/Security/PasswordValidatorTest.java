package com.que.que.Security;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class PasswordValidatorTest {

    private PasswordValidator passwordValidator;

    @Before
    public void setUp() {
        passwordValidator = new PasswordValidator();
    }

    @Test
    public void testValidPassword() {
        String password = "Abcdefg1";
        assertTrue(passwordValidator.test(password));
    }

    @Test
    public void testInvalidPassword_TooShort() {
        String password = "Abc123";
        assertFalse(passwordValidator.test(password));
    }

    @Test
    public void testInvalidPassword_NoUppercase() {
        String password = "abcdefg1";
        assertFalse(passwordValidator.test(password));
    }

    @Test
    public void testInvalidPassword_NoLowercase() {
        String password = "ABCDEFG1";
        assertFalse(passwordValidator.test(password));
    }

    @Test
    public void testInvalidPassword_NoDigit() {
        String password = "Abcdefgh";
        assertFalse(passwordValidator.test(password));
    }

    @Test
    public void testInvalidPassword_NoUppercaseAndLowercase() {
        String password = "12345678";
        assertFalse(passwordValidator.test(password));
    }

    @Test
    public void testInvalidPassword_NoUppercaseAndDigit() {
        String password = "abcdefgh";
        assertFalse(passwordValidator.test(password));
    }

    @Test
    public void testInvalidPassword_NoLowercaseAndDigit() {
        String password = "ABCDEFG";
        assertFalse(passwordValidator.test(password));
    }

    @Test
    public void testInvalidPassword_AllLowerCase() {
        String password = "abcdefgh";
        assertFalse(passwordValidator.test(password));
    }

    @Test
    public void testInvalidPassword_AllUpperCase() {
        String password = "ABCDEFGH";
        assertFalse(passwordValidator.test(password));
    }

    @Test
    public void testInvalidPassword_AllDigits() {
        String password = "12345678";
        assertFalse(passwordValidator.test(password));
    }
}
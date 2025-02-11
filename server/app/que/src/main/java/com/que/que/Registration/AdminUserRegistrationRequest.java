package com.que.que.Registration;

import java.time.LocalDate;

import lombok.Getter;

@Getter
public class AdminUserRegistrationRequest extends AppUserRegistrationRequest {

    public AdminUserRegistrationRequest(
            String firstName,
            String lastName,
            LocalDate dateOfBirth,
            String countryOfOrigin,
            String password,
            String email,
            String confirmPassword,
            String phoneCode,
            String phoneNumber) {
        super(firstName, lastName, dateOfBirth, countryOfOrigin, password, email, confirmPassword, phoneCode,
                phoneNumber);
    }
}

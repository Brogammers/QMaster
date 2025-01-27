package com.que.que.Registration;

import java.time.LocalDate;

import lombok.Getter;

@Getter
public class BusinessUserRegistrationRequest extends AppUserRegistrationRequest {

    private String partnerName;

    public BusinessUserRegistrationRequest(
            String firstName,
            String lastName,
            LocalDate dateOfBirth,
            String countryOfOrigin,
            String password,
            String email,
            String username,
            String confirmPassword,
            String phoneCode,
            String phoneNumber,
            String partnerName) {
        super(firstName, lastName, dateOfBirth, countryOfOrigin, password, email, username, confirmPassword, phoneCode,
                phoneNumber);
        this.partnerName = partnerName;
    }

}

package com.que.que.Registration;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {

    private final String firstName;
    private final String lastName;
    private final LocalDate dateOfBirth;
    private final String countryOfOrigin;
    private final String password;
    private final String email;
    private final String username;
    private final String confirmPassword;
}

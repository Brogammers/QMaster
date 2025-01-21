package com.que.que.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ResetPasswordRequest {
    private long id;
    private String email;
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}

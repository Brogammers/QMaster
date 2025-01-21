package com.que.que.User.BusinessUser;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class BusinessUserUpdateRequest {
    private long id;
    private String category;
}

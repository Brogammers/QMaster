package com.que.que.User.BusinessUser;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BusinessCategoryRequest {
    private String name;
    private String description;
    private String status;
}

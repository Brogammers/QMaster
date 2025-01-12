package com.que.que.Store;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StoreCreationRequest {
    private Long id;
    private String name;
    private String description;
    private String location;

    public StoreCreationRequest(Long id, String name, String location) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.description = "";
    }
}

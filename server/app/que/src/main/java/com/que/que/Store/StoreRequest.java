package com.que.que.Store;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class StoreRequest {
    private final long businessUserId;
    private final long locationId;
}

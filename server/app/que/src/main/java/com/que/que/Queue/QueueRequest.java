package com.que.que.Queue;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@EqualsAndHashCode
@ToString
public class QueueRequest {
    private final String name;
    private Long id;
    private Long storeId;

    public QueueRequest(String name) {
        this.name = name;
    }

    public QueueRequest(String name, Long id) {
        this.name = name;
        this.id = id;
    }
}

package com.que.que.Queue;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@EqualsAndHashCode
@ToString
@AllArgsConstructor
public class QueueRequest {
    private String name;
    private Long id;
    private Long locationId;
    private int maxQueueSize;
    private int averageServiceTime;
    private boolean isActive;
}

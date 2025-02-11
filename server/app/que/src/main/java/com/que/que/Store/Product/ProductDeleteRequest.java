package com.que.que.Store.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductDeleteRequest {
    private final long productId;
    private final long locationId;
}

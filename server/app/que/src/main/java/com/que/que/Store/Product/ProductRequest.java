package com.que.que.Store.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductRequest {
    private final String name;
    private final String description;
    private final double price;
    private final int quantity;
    private final String storeName;
}

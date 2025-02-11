package com.que.que.Store;

import java.util.List;

import com.que.que.Store.Product.ProductCreationRequest;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
class PaymentInfoRequest {
    private final String accountName;
    private final String iban;
    private final String bank;
}

@AllArgsConstructor
@Getter
public class StoreSetupRequest {
    private final List<ProductCreationRequest> products;
    private final PaymentInfoRequest paymentInfo;
    private final long locationId;
}

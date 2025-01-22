package com.que.que.Store;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.Store.Product.Product;
import com.que.que.Store.Product.ProductRequest;
import com.que.que.Store.Product.ProductService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/store")
public class StoreController {
    private final ProductService productService;
    private final StoreService storeService;

    @PostMapping("/product")
    @Secured("BUSINESS_OWNER")
    public ResponseEntity<Object> addProduct(@RequestBody ProductRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            Product product = productService.createProduct(request.getName(), request.getDescription(),
                    request.getPrice(),
                    request.getQuantity(), request.getStoreName());
            body.put("message", "Product created");
            body.put("product", product);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PostMapping
    @Secured("BUSINESS_OWNER")
    public ResponseEntity<Object> createStore(@RequestBody StoreRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            Store store = storeService.createStore(request.getId());
            body.put("message", "Store created");
            body.put("store", store);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @GetMapping("/products")
    public ResponseEntity<Object> getProductsByStoreName(@RequestParam("businessName") String businessName,
            @RequestParam("page") int page, @RequestParam("per-page") int perPage) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            Page<Product> res = productService.getProductsByStoreName(businessName, page, perPage);
            body.put("products", res);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @GetMapping
    public ResponseEntity<Object> getIfHasStore(@RequestParam("businessName") String businessName) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            boolean res = storeService.hasStore(businessName);
            body.put("access", res);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}

package com.que.que.Store;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.Security.JwtUtil;
import com.que.que.Store.Product.Product;
import com.que.que.Store.Product.ProductCreationRequest;
import com.que.que.Store.Product.ProductDeleteRequest;
import com.que.que.Store.Product.ProductService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/store")
public class StoreController {
    private final ProductService productService;
    private final StoreService storeService;
    private final JwtUtil jwtUtil;

    @DeleteMapping("/product")
    @Secured("BUSINESS_OWNER")
    public ResponseEntity<Object> deleteProduct(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody ProductDeleteRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            String email = jwtUtil.getEmail(token.substring(7));
            productService.deleteProduct(request.getProductId(), email, request.getLocationId());
            body.put("message", "Product deleted");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PostMapping("/product")
    @Secured("BUSINESS_OWNER")
    public ResponseEntity<Object> addProduct(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody ProductCreationRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            String email = jwtUtil.getEmail(token.substring(7));
            Product product = productService.createProduct(request.getName(), request.getDescription(),
                    request.getPrice(),
                    request.getQuantity(), email, request.getType(), request.getLocationId());
            body.put("message", "Product created");
            body.put("product", product);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PostMapping("/setup")
    @Secured("BUSINESS_OWNER")
    public ResponseEntity<Object> setupStore(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody StoreSetupRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            String email = jwtUtil.getEmail(token.substring(7));
            storeService.setupStore(email, request.getProducts(), request.getPaymentInfo().getAccountName(),
                    request.getPaymentInfo().getIban(), request.getPaymentInfo().getBank(), request.getLocationId());
            body.put("message", "Store setup");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PostMapping("/documents")
    @Secured("BUSINESS_OWNER")
    public ResponseEntity<Object> requestStore(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody StoreRequestRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            String email = jwtUtil.getEmail(token.substring(7));
            storeService.requestStore(email, request.getDocuments(), request.getLocationId());
            body.put("message", "Store requested");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PostMapping
    @Secured("BUSINESS_OWNER")
    public ResponseEntity<Object> createStore(@RequestBody StoreCreationRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            Store store = storeService.createStore(request.getBusinessUserId(), request.getLocationId());
            body.put("message", "Store created");
            body.put("store", store);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @GetMapping("/products")
    public ResponseEntity<Object> getProductsByStoreName(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam(value = "businessName", required = false) String businessName,
            @RequestParam("page") int page, @RequestParam("per-page") int perPage,
            @RequestParam("locationId") long locationId) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            String email = token.length() > 7 ? jwtUtil.getEmail(token.substring(7)) : token;
            Page<Product> products = productService.getProductsByStoreName(businessName, page, perPage, email,
                    locationId);
            body.put("products", products);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @GetMapping
    public ResponseEntity<Object> getIfHasStore(@RequestParam("businessName") String businessName,
            @RequestParam("locationId") long locationId) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            boolean res = storeService.hasStore(businessName, locationId);
            body.put("access", res);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @GetMapping("/status")
    public ResponseEntity<Object> getStoreStatus(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam("id") long locationId) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            String email = jwtUtil.getEmail(token.substring(7));
            StoreStatus res = storeService.getStoreStatus(email, locationId);
            body.put("status", res);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}

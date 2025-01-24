package com.que.que.User.BusinessUser;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/category")
@AllArgsConstructor
public class BusinessCategoryController {
    private final BusinessCategoryService businessCategoryService;

    @GetMapping
    public ResponseEntity<Object> getAllCategories(@RequestParam("page") int page,
            @RequestParam("per-page") int perPage) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            Page<BusinessCategory> categories = businessCategoryService.getAllCategories(page, perPage);
            body.put("categories", categories);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PostMapping
    public ResponseEntity<Object> createCategory(@RequestBody BusinessCategoryRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            BusinessCategory category = businessCategoryService.createCategory(request.getName(),
                    request.getDescription(), request.getStatus());
            body.put("message", "Category created successfully");
            body.put("category", category);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteCategory(@RequestBody BusinessCategoryDeleteRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(204);
        try {
            businessCategoryService.deleteCategory(request.getId());
            body.put("message", "Category deleted successfully");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

}

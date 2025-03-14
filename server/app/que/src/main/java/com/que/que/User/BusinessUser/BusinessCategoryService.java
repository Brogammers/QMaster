package com.que.que.User.BusinessUser;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BusinessCategoryService {
    private final BusinessCategoryRepository businessCategoryRepository;

    public BusinessCategory createCategory(String name, String description, String status) {
        BusinessCategory businessCategory = new BusinessCategory(name, description, status);
        return businessCategoryRepository.save(businessCategory);
    }

    public Page<BusinessCategory> getAllCategories(int page, int perPage) {
        Pageable pageable = PageRequest.of(page - 1, perPage);
        return businessCategoryRepository.findAll(pageable);
    }

    public void deleteCategory(Long id) {
        businessCategoryRepository.deleteById(id);
    }

    public BusinessCategory getCategory(Long id) {
        return businessCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Category not found"));
    }

    public BusinessCategory getCategory(String name) {
        return businessCategoryRepository.findByName(name)
                .orElseThrow(() -> new IllegalStateException("Category not found"));
    }
}

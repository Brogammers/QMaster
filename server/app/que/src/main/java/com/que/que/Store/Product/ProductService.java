package com.que.que.Store.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.que.que.Location.LocationRepository;
import com.que.que.Partner.Partner;
import com.que.que.Partner.PartnerRepository;
import com.que.que.Store.Store;
import com.que.que.Store.StoreRepository;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final BusinessUserRepository businessUserRepository;
    private final PartnerRepository partnerRepository;
    private final LocationRepository locationRepository;

    public Page<Product> getProductsByStoreName(String storeName, int pageNumber, int perPage, String email,
            long locationId) {
        if (storeName == null && email == null) {
            throw new IllegalStateException("Store name or email must be provided");
        }

        Partner partner;
        if (storeName != null) {
            partner = partnerRepository.findByName(storeName)
                    .orElseThrow(() -> new IllegalStateException("Business not found"));
        } else {
            partner = businessUserRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalStateException("Business not found")).getPartner();
        }

        locationRepository.findByIdAndPartner(locationId, partner)
                .orElseThrow(() -> new IllegalStateException("Location not found"));

        Store store = storeRepository.findByLocationId(locationId)
                .orElseThrow(() -> new IllegalStateException("Store not found"));

        Pageable page = PageRequest.of(pageNumber - 1, perPage);
        return productRepository.findByStoreId(store.getId(), page);
    }

    public Product createProduct(String name, String description, double price, int quantity, String email,
            String type, long locationId) {
        BusinessUser businessUser = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business not found"));
        Store store = storeRepository.findByLocationId(locationId)
                .orElseThrow(() -> new IllegalStateException("Store not found"));
        locationRepository.findByIdAndPartner(locationId, businessUser.getPartner())
                .orElseThrow(() -> new IllegalStateException("Location not found"));
        Product existingProduct = productRepository.findByNameAndStoreId(name, store.getId()).orElse(null);

        if (existingProduct != null) {
            throw new IllegalStateException("Product with this name already exists");
        }

        ProductType productType = ProductType.valueOf(type);
        Product product = new Product(name, description, price, quantity, store, productType);
        productRepository.save(product);

        return product;
    }

    public void deleteProduct(long productId, String email, long locationId) {
        BusinessUser businessUser = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business not found"));
        Store store = storeRepository.findByLocationId(locationId)
                .orElseThrow(() -> new IllegalStateException("Store not found"));
        locationRepository.findByIdAndPartner(locationId, businessUser.getPartner())
                .orElseThrow(() -> new IllegalStateException("Location not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalStateException("Product not found"));

        if (product.getStore().getId() != store.getId()) {
            throw new IllegalStateException("Product not found");
        }

        productRepository.delete(product);
    }
}

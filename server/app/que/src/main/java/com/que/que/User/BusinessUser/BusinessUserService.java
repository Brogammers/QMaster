package com.que.que.User.BusinessUser;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.que.que.Registration.Token.ConfirmationToken;
import com.que.que.Registration.Token.ConfirmationTokenService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BusinessUserService implements UserDetailsService {

    private final BusinessUserRepository businessUserRepository;
    private final BusinessCategoryRepository businessCategoryRepository;
    private static final String USER_NOT_FOUND_MSG = "User with email %s was not found in the database";
    private final ConfirmationTokenService confirmationTokenService;
    // private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return businessUserRepository
                .findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format(USER_NOT_FOUND_MSG, username)));
    }

    public String signUpUser(BusinessUser appUser) {
        boolean userExists = businessUserRepository
                .findByEmail(appUser.getEmail())
                .isPresent();
        if (userExists) {
            throw new IllegalStateException("Email is already in use.");
        }

        String encodedPassword = passwordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);

        businessUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(1),
                null,
                appUser);

        confirmationTokenService.saveConfirmationToken(confirmationToken);
        Map<String, String> context = new HashMap<>();
        context.put("name", appUser.getFirstName());
        // TODO: Disabled for now
        /*
         * emailService.send(appUser.getEmail(),
         * "src/main/resources/templates/Hello.html", "Welcome!", context); // TODO:
         * Send email
         */
        return confirmationToken.toString();
    }

    public void enableAppUser(String email) {
        BusinessUser appUser = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User was not found"));
        appUser.setEnabled(true);
    }

    public Page<BusinessUser> getBusinessesWithCategory(String category, int page, int perPage) {
        Pageable pageable = PageRequest.of(page - 1, perPage);

        BusinessCategory businessCategory = businessCategoryRepository
                .findByName(category)
                .orElseThrow(() -> new IllegalStateException("Category not found"));

        Page<BusinessUser> businesses = businessUserRepository.findAllByBusinessCategory(businessCategory.getId(),
                pageable);
        return businesses;
    }

    public void addCategory(String category, long id) {
        BusinessCategory businessCategory = businessCategoryRepository
                .findByName(category)
                .orElseThrow(() -> new IllegalStateException("Category not found"));

        BusinessUser businessUser = businessUserRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        businessUser.addBusinessCategory(businessCategory);
        businessUserRepository.save(businessUser);
    }

    public BusinessUser getBusinessUserByEmail(String email) {
        return businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));

    }
}

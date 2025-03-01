package com.que.que.User.AdminUser;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
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

import com.que.que.Partner.Partner;
import com.que.que.Partner.PartnerRepository;
import com.que.que.Registration.Token.ConfirmationToken;
import com.que.que.Registration.Token.ConfirmationTokenService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminUserService implements UserDetailsService {
    private final AdminUserRepository adminUserRepository;
    private static final String USER_NOT_FOUND_MSG = "User with email %s was not found in the database";
    private final ConfirmationTokenService confirmationTokenService;
    // private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final PartnerRepository partnerRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return adminUserRepository
                .findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format(USER_NOT_FOUND_MSG, username)));
    }

    public String signUpUser(AdminUser adminUser) {
        boolean userExists = adminUserRepository
                .findByEmail(adminUser.getEmail())
                .isPresent();
        if (userExists) {
            throw new IllegalStateException("Email is already in use.");
        }

        String encodedPassword = passwordEncoder.encode(adminUser.getPassword());
        adminUser.setPassword(encodedPassword);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(1),
                null,
                adminUser);

        adminUserRepository.save(adminUser);
        confirmationTokenService.saveConfirmationToken(confirmationToken);
        Map<String, String> context = new HashMap<>();
        context.put("name", adminUser.getFirstName());
        // TODO: Disabled for now
        /*
         * emailService.send(appUser.getEmail(),
         * "src/main/resources/templates/Hello.html", "Welcome!", context); // TODO:
         * Send email
         */

        return confirmationToken.toString();
    }

    public void enableAppUser(String email) {
        AdminUser adminUser = adminUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User was not found"));
        adminUser.setEnabled(true);
    }

    public List<AdminUser> getAdminUsers() {
        return adminUserRepository.findAll();
    }

    public Page<Partner> getBusinesses(int page, int perPage) {
        Pageable pageable = PageRequest.of(page - 1, perPage);
        Page<Partner> partners = partnerRepository.findAll(pageable);

        return partners;
    }
}

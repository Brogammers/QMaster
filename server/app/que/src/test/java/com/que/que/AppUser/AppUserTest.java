package com.que.que.AppUser;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import com.que.que.User.AppUser;
import com.que.que.User.AppUserRole;
import com.que.que.User.SubscriptionPlans;

import static org.junit.Assert.*;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.time.LocalDateTime;
import java.time.LocalDate;

@RunWith(MockitoJUnitRunner.class)
public class AppUserTest {

    /**
     * Test case for testing the getters and setters of the AppUser class.
     */
    @Test(timeout = 5000)
    public void testGettersAndSetters() {
        // Create a sample AppUser object
        AppUser appUser = new AppUser();

        // Set values using setters
        appUser.setId(1L);
        appUser.setAppUserRole(AppUserRole.ADMIN);
        appUser.setFirstName("John");
        appUser.setLastName("Doe");
        appUser.setUserName("johndoe"); // Fix undefined method error
        appUser.setPhoneCode("+1");
        appUser.setPhoneNumber("1234567890");
        appUser.setDateOfRegistration(LocalDateTime.now()); // Fix missing import
        appUser.setDateOfBirth(LocalDate.of(1990, 1, 1)); // Fix missing import
        appUser.setCountryOfOrigin("USA");
        appUser.setPassword("password");
        appUser.setEmail("johndoe@example.com");
        appUser.setLocked(false);
        appUser.setEnabled(true);
        appUser.setQueueId(-1);
        appUser.setSubscriptionPlan(SubscriptionPlans.BASIC);
        appUser.setLocation("New York, USA");

        // Verify values using getters
        assertEquals(1L, appUser.getId().longValue());
        assertEquals(AppUserRole.ADMIN, appUser.getAppUserRole());
        assertEquals("John", appUser.getFirstName());
        assertEquals("Doe", appUser.getLastName());
        assertEquals("johndoe", appUser.getUsername());
        assertEquals("+1", appUser.getPhoneCode());
        assertEquals("1234567890", appUser.getPhoneNumber());
        assertNotNull(appUser.getDateOfRegistration());
        assertEquals(LocalDate.of(1990, 1, 1), appUser.getDateOfBirth());
        assertEquals("USA", appUser.getCountryOfOrigin());
        assertEquals("password", appUser.getPassword());
        assertEquals("johndoe@example.com", appUser.getEmail());
        assertFalse(appUser.isLocked());
        assertTrue(appUser.isEnabled());
        assertEquals(-1, appUser.getQueueId());
        assertEquals(SubscriptionPlans.BASIC, appUser.getSubscriptionPlan());
        assertEquals("New York, USA", appUser.getLocation());
    }

    /**
     * Test case for testing the getAuthorities() method of the AppUser class.
     */
    @Test(timeout = 5000)
    public void testGetAuthorities() {
        // Create a sample AppUser object
        AppUser appUser = new AppUser();
        appUser.setAppUserRole(AppUserRole.USER);

        // Get authorities
        Collection<? extends GrantedAuthority> authorities = appUser.getAuthorities();

        // Verify authorities
        assertEquals(1, authorities.size());
        assertTrue(authorities.contains(new SimpleGrantedAuthority(AppUserRole.USER.name())));
    }

    /**
     * Test case for testing the isAccountNonLocked() method of the AppUser class.
     */
    @Test(timeout = 5000)
    public void testAccountNonLocked() {
        // Create a locked AppUser
        AppUser lockedUser = new AppUser();
        lockedUser.setLocked(true);

        // Create a non-locked AppUser
        AppUser nonLockedUser = new AppUser();
        nonLockedUser.setLocked(false);

        // Verify account non-locked status
        assertFalse(lockedUser.isAccountNonLocked());
        assertTrue(nonLockedUser.isAccountNonLocked());
    }

    /**
     * Test case for testing the isEnabled() method of the AppUser class.
     */
    @Test(timeout = 5000)
    public void testIsEnabled() {
        // Create an enabled AppUser
        AppUser enabledUser = new AppUser();
        enabledUser.setEnabled(true);

        // Create a disabled AppUser
        AppUser disabledUser = new AppUser();
        disabledUser.setEnabled(false);

        // Verify enabled status
        assertTrue(enabledUser.isEnabled());
        assertFalse(disabledUser.isEnabled());
    }
}
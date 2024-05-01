package com.que.que.User.BusinessUser;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.que.que.Queue.QueueRepository;
import com.que.que.Queue.Queues;
import com.que.que.User.SubscriptionPlans;

import static org.junit.Assert.*;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.time.LocalDateTime;
import java.time.LocalDate;

@RunWith(MockitoJUnitRunner.class)
public class BusinessUserTest {

    @Mock
    private QueueRepository queueRepository;

    @Before
    public void setUp() {
        // Create a sample BusinessUser object
        queueRepository = Mockito.mock(QueueRepository.class);
    }

    /**
     * Test case for testing the getters and setters of the AppUser class.
     */
    @Test(timeout = 5000)
    public void testGettersAndSetters() {
        // Create a sample AppUser object
        BusinessUser appUser = new BusinessUser();

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

    /*
     * @Test(timeout = 5000)
     * public void testGetAuthorities() {
     * // Create a sample AppUser object
     * BusinessUser appUser = new BusinessUser();
     * appUser.setAppUserRole(BusinessUserRole.OWNER);
     * 
     * // Get authorities
     * Collection<? extends GrantedAuthority> authorities =
     * appUser.getAuthorities();
     * 
     * // Verify authorities
     * assertEquals(1, authorities.size());
     * assertTrue(authorities.contains(new
     * SimpleGrantedAuthority(BusinessUserRole.OWNER.name())));
     * }
     */

    /**
     * Test case for testing the isAccountNonLocked() method of the AppUser class.
     */
    @Test(timeout = 5000)
    public void testAccountNonLocked() {
        // Create a locked AppUser
        BusinessUser lockedUser = new BusinessUser();
        lockedUser.setLocked(true);

        // Create a non-locked AppUser
        BusinessUser nonLockedUser = new BusinessUser();
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
        BusinessUser enabledUser = new BusinessUser();
        enabledUser.setEnabled(true);

        // Create a disabled AppUser
        BusinessUser disabledUser = new BusinessUser();
        disabledUser.setEnabled(false);

        // Verify enabled status
        assertTrue(enabledUser.isEnabled());
        assertFalse(disabledUser.isEnabled());
    }
}
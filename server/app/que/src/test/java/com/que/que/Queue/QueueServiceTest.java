package com.que.que.Queue;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.google.zxing.WriterException;
import com.que.que.QRcode.QRCodeService;
import com.que.que.User.AppUser;
import com.que.que.User.AppUserRepository;
import com.que.que.User.AppUserRole;
import com.que.que.User.SubscriptionPlans;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class QueueServiceTest {

    @Mock
    private AppUserRepository appUserRepository;

    @Mock
    private QueueRepository queueRepository;

    @Mock
    private QueueCreationRepository queueCreationRepository;

    @Mock
    private QRCodeService qrCodeService;

    @Mock
    private QueueEnqueueRepository queueEnqueueRepository;

    @InjectMocks
    private QueueService queueService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test(timeout = 5000)
    public void testCreateNewQueue() {
        // Arrange
        Long queueHolderID = 1L;
        String name = "TestQueue";
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
        when(appUserRepository.findById(queueHolderID)).thenReturn(Optional.of(appUser));
        when(queueRepository.findByName(name)).thenReturn(Optional.empty());

        // Act
        queueService.createNewQueue(queueHolderID, name);

        // Assert
        verify(appUserRepository, times(3)).findById(queueHolderID);
        verify(queueRepository, times(1)).findByName(name);
        try {
            verify(qrCodeService, times(1)).createQRCode(eq(queueHolderID), anyInt(), anyString());
        } catch (IOException | WriterException e) {
            assert (false);
        }
        verify(queueRepository, times(1)).save(any(Queues.class));
        verify(queueCreationRepository, times(1)).save(any(QueueCreation.class));
        // Add additional assertions as needed
    }

    @Test(timeout = 5000)
    public void testIsValidForNewQueue_Basic() {
        // Arrange
        Long queueHolderID = 1L;
        AppUser appUser = new AppUser();
        appUser.setQueueId(-1);
        appUser.setSubscriptionPlan(SubscriptionPlans.BASIC);
        when(appUserRepository.findById(queueHolderID)).thenReturn(Optional.of(appUser));

        // Act
        boolean isValidBeforeQueue = queueService.isValidForNewQueue(queueHolderID);

        // Assert
        assertTrue(isValidBeforeQueue);
        verify(appUserRepository, times(1)).findById(queueHolderID);

        queueService.createNewQueue(queueHolderID, "test");

        boolean isValidAfterQueue = queueService.isValidForNewQueue(queueHolderID);

        assertFalse(isValidAfterQueue);
    }

    @Test(timeout = 5000)
    public void testIsValidForNewQueue_Enterprise() {
        // Arrange
        Long queueHolderID = 1L;
        AppUser appUser = new AppUser();
        appUser.setQueueId(-1);
        appUser.setSubscriptionPlan(SubscriptionPlans.ENTERPRISE);
        when(appUserRepository.findById(queueHolderID)).thenReturn(Optional.of(appUser));

        // Act
        boolean isValidBeforeQueue = queueService.isValidForNewQueue(queueHolderID);

        // Assert
        assertTrue(isValidBeforeQueue);
        verify(appUserRepository, times(1)).findById(queueHolderID);

        for (int i = 0; i < queueService.MAX_ENTERPRISE_QUEUES; i++)
            queueService.createNewQueue(queueHolderID, "test" + i);

        boolean isValidAfterQueue = queueService.isValidForNewQueue(queueHolderID);

        assertFalse(isValidAfterQueue);
    }

    @Test(timeout = 5000)
    public void testIsValidForNewQueue_Premium() {
        // Arrange
        Long queueHolderID = 1L;
        AppUser appUser = new AppUser();
        appUser.setQueueId(-1);
        appUser.setSubscriptionPlan(SubscriptionPlans.PREMIUM);
        when(appUserRepository.findById(queueHolderID)).thenReturn(Optional.of(appUser));

        // Act
        boolean isValidBeforeQueue = queueService.isValidForNewQueue(queueHolderID);

        // Assert
        assertTrue(isValidBeforeQueue);

        for (int i = 0; i < queueService.MAX_PREMIUM_QUEUES; i++)
            queueService.createNewQueue(queueHolderID, "test" + i);

        boolean isValidAfterQueue = queueService.isValidForNewQueue(queueHolderID);

        assertFalse(isValidAfterQueue);
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testCreatingMoreQueuesThanMaxAllowed_Basic() {
        // Arrange
        Long queueHolderID = 1L;
        AppUser appUser = new AppUser();
        appUser.setQueueId(-1);
        appUser.setSubscriptionPlan(SubscriptionPlans.BASIC);
        when(appUserRepository.findById(queueHolderID)).thenReturn(Optional.of(appUser));

        // Act
        for (int i = 0; i < queueService.MAX_BASIC_QUEUES + 1; i++)
            queueService.createNewQueue(queueHolderID, "test" + i);

        // Assert
        // Expects IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testCreatingMoreQueuesThanMaxAllowed_Premium() {
        // Arrange
        Long queueHolderID = 1L;
        AppUser appUser = new AppUser();
        appUser.setQueueId(-1);
        appUser.setSubscriptionPlan(SubscriptionPlans.BASIC);
        when(appUserRepository.findById(queueHolderID)).thenReturn(Optional.of(appUser));

        // Act
        for (int i = 0; i < queueService.MAX_PREMIUM_QUEUES + 1; i++)
            queueService.createNewQueue(queueHolderID, "test" + i);

        // Assert
        // Expects IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testCreatingMoreQueuesThanMaxAllowed_Enterprise() {
        // Arrange
        Long queueHolderID = 1L;
        AppUser appUser = new AppUser();
        appUser.setQueueId(-1);
        appUser.setSubscriptionPlan(SubscriptionPlans.BASIC);
        when(appUserRepository.findById(queueHolderID)).thenReturn(Optional.of(appUser));

        // Act
        for (int i = 0; i < queueService.MAX_ENTERPRISE_QUEUES + 1; i++)
            queueService.createNewQueue(queueHolderID, "test" + i);

        // Assert
        // Expects IllegalStateException to be thrown
    }

    /*
     * @Test(timeout = 5000)(timeout = 5000)
     * public void testEnqueueUser_Success() {
     * // Arrange
     * Long appUserId = 1L;
     * String queueName = "TestQueue";
     * AppUser appUser = new AppUser();
     * appUser.setId(appUserId);
     * appUser.setSubscriptionPlan(SubscriptionPlans.BASIC);
     * appUser.setQueueId(-1);
     * when(appUserRepository.findById(appUserId)).thenReturn(Optional.of(appUser));
     * 
     * queueService.createNewQueue(appUserId, queueName);
     * 
     * // Act
     * queueService.enqueueUser(appUserId, queueName);
     * 
     * // Assert
     * verify(appUserRepository, times(1)).findById(appUserId);
     * verify(queueRepository, times(1)).findByName(queueName);
     * verify(queueEnqueueRepository, times(1)).save(any(QueueEnqueue.class));
     * // Add additional assertions as needed
     * }
     */
    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testEnqueueUser_UserNotFound() {
        // Arrange
        Long appUserId = 1L;
        String queueName = "TestQueue";
        when(appUserRepository.findById(appUserId)).thenReturn(Optional.empty());

        // Act
        queueService.enqueueUser(appUserId, queueName);

        // Assert
        // Expects IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testEnqueueUser_QueueNotFound() {
        // Arrange
        Long appUserId = 1L;
        String queueName = "TestQueue";
        AppUser appUser = new AppUser();
        appUser.setId(appUserId);
        when(appUserRepository.findById(appUserId)).thenReturn(Optional.of(appUser));
        when(queueRepository.findByName(queueName)).thenReturn(Optional.empty());

        // Act
        queueService.enqueueUser(appUserId, queueName);

        // Assert
        // Expects IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testEnqueueUser_UserAlreadyInQueue() {
        // Arrange
        Long appUserId = 1L;
        String queueName = "TestQueue";
        AppUser appUser = new AppUser();
        appUser.setId(appUserId);
        queueService.createNewQueue(appUserId, queueName);
        when(appUserRepository.findById(appUserId)).thenReturn(Optional.of(appUser));

        queueService.enqueueUser(appUserId, queueName);
        queueService.enqueueUser(appUserId, queueName);

        // Assert
        // Expects IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testEnqueueUser_CouldNotAddUserToQueue() {
        // Arrange
        Long appUserId = 1L;
        String queueName = "TestQueue";
        AppUser appUser = new AppUser();
        appUser.setId(appUserId);

        when(appUserRepository.findById(appUserId)).thenReturn(Optional.of(appUser));

        // Act
        queueService.enqueueUser(appUserId, queueName);

        // Assert
        // Expects IllegalStateException to be thrown
    }

    @Test(expected = IllegalStateException.class, timeout = 5000)
    public void testMaxQueueSize_Fail() {
        // Arrange
        AppUser[] appUsers = new AppUser[queueService.MAX_QUEUE_SIZE + 1];
        String queueName = "TestQueue";
        for (int i = 1; i < queueService.MAX_QUEUE_SIZE + 2; i++) {
            AppUser appUser = new AppUser();
            Long appUserId = (long) i;
            appUser.setId(appUserId);
            appUser.setSubscriptionPlan(SubscriptionPlans.BASIC);
            appUser.setQueueId(-1);
            appUsers[i - 1] = appUser;
        }

        for (int i = 0; i < queueService.MAX_QUEUE_SIZE + 1; i++) {
            when(appUserRepository.findById((long) i + 1)).thenReturn(Optional.of(appUsers[i]));
        }

        queueService.createNewQueue(1L, queueName);

        Queues queues = new Queues();
        queues.setCreator(appUsers[0]);
        queues.setName(queueName);
        when(queueRepository.findByName(queueName)).thenReturn(Optional.of(queues));
        // Act
        for (int i = 0; i < queueService.MAX_QUEUE_SIZE + 1; i++) {
            queueService.enqueueUser((long) (i + 1), queueName);
        }

        // Assert
        // Expects IllegalStateException to be thrown
    }

    @Test(timeout = 5000)
    public void testMaxQueueSize_Succeed() {
        // Arrange
        AppUser[] appUsers = new AppUser[queueService.MAX_QUEUE_SIZE];
        String queueName = "TestQueue";
        for (int i = 1; i < queueService.MAX_QUEUE_SIZE + 1; i++) {
            AppUser appUser = new AppUser();
            Long appUserId = (long) i;
            appUser.setId(appUserId);
            appUser.setSubscriptionPlan(SubscriptionPlans.BASIC);
            appUser.setQueueId(-1);
            appUsers[i - 1] = appUser;
        }

        for (int i = 0; i < queueService.MAX_QUEUE_SIZE; i++) {
            when(appUserRepository.findById((long) i + 1)).thenReturn(Optional.of(appUsers[i]));
        }

        queueService.createNewQueue(1L, queueName);

        Queues queues = new Queues();
        queues.setCreator(appUsers[0]);
        queues.setName(queueName);
        when(queueRepository.findByName(queueName)).thenReturn(Optional.of(queues));
        // Act
        for (int i = 0; i < queueService.MAX_QUEUE_SIZE; i++) {
            queueService.enqueueUser((long) (i + 1), queueName);
        }

        // Assert
        // Expects IllegalStateException to be thrown
    }
}
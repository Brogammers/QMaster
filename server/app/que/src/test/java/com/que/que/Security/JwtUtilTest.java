package com.que.que.Security;

import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;

import com.que.que.User.AppUser.AppUser;

import java.util.Date;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    public void setUp() {
        jwtUtil = new JwtUtil();
    }

    @Test()
    @Timeout(5000)
    public void testGenerateToken() {
        String username = "testUser";
        String token = JwtUtil.generateToken(username);

        assertNotNull(token);
        assertTrue(token.length() > 0);
    }

    @Test()
    @Timeout(5000)
    public void testExtractBody_ValidToken() {
        String username = "testUser";
        String token = JwtUtil.generateToken(username);

        Object body = JwtUtil.extractBody(token);

        assertNotNull(body);
        assertTrue(body instanceof Claims);
    }

    @Test()
    @Timeout(5000)
    public void testExtractBody_InvalidToken() {
        String invalidToken = "invalidToken";

        assertThrows(IllegalStateException.class, () -> JwtUtil.extractBody(invalidToken));
    }

    @Test()
    @Timeout(5000)
    public void testGetUsername() {
        String username = "testUser";
        String token = JwtUtil.generateToken(username);

        String extractedUsername = jwtUtil.getUsername(token);

        assertEquals(username, extractedUsername);
    }

    /**
     * Test case to verify the functionality of the getIssuedDate method in
     * JwtUtil
     * class.
     * It generates a token for a test user, and then retrieves the issued date
     * from
     * the token.
     * The test ensures that the issued date is not null.
     */

    @Test()
    @Timeout(5000)
    public void testGetExpirationDate() {
        String username = "testUser";
        String token = JwtUtil.generateToken(username);
        Date expirationDate = jwtUtil.getExpirationDate(token);

        assertNotNull(expirationDate);
    }

    @Test()
    @Timeout(5000)
    public void testIsTokenExpired_NotExpired() {
        String username = "testUser";
        String token = JwtUtil.generateToken(username);

        boolean isExpired = jwtUtil.isTokenExpired(token);

        assertFalse(isExpired);
    }

    @Test()
    @Timeout(5000)
    public void testGetClaimFromToken() {
        String username = "testUser";
        String token = JwtUtil.generateToken(username);

        String extractedUsername = jwtUtil.getClaimFromToken(token, Claims::getId);

        assertEquals(username, extractedUsername);
    }

    @Test()
    @Timeout(5000)
    public void testValidateToken_ValidToken() {
        String username = "testUser";
        String token = JwtUtil.generateToken(username);

        AppUser userDetails = mock(AppUser.class);
        when(userDetails.getEmail()).thenReturn(username);

        boolean isValid = jwtUtil.validateToken(token, userDetails);

        assertTrue(isValid);
    }

    @Test()
    @Timeout(5000)
    public void testValidateToken_InvalidUser() {
        String username = "testUser";
        String token = JwtUtil.generateToken(username);

        AppUser userDetails = mock(AppUser.class);
        when(userDetails.getEmail()).thenReturn("anotherUser");

        boolean isValid = jwtUtil.validateToken(token, userDetails);

        assertFalse(isValid);
    }
}
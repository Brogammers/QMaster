package com.que.que.Security;

import io.jsonwebtoken.*;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import com.que.que.User.AppUser;

@Service
public class JwtUtil {
  private static final SecretKey SECRET = generateKey();

  private static final long EXPIRATION_TIME = 864_000_000; // 10 days

  public static String generateToken(String username) {
    return Jwts.builder()
        .id(username)
        .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .signWith(SECRET)
        .compact();
  }

  public static Object extractBody(String token) {
    JwtParser jwtParser = Jwts.parser()
        .verifyWith(SECRET)
        .build();

    try {
      return jwtParser.parse(token).getPayload();
    } catch (Exception e) {
      throw new IllegalStateException("Could not verify JWT token integrity!");
    }
  }

  public static SecretKey generateKey() {
    KeyGenerator keyPairGen;
    try {
      keyPairGen = KeyGenerator.getInstance("HmacSHA256");
    } catch (Exception e) {
      throw new IllegalStateException("Algorithm not found with name " + e.toString());
    }
    keyPairGen.init(2048);
    SecretKey key = keyPairGen.generateKey();
    return key;
  }

  public String getUsername(String token) {
    return getClaimFromToken(token, Claims::getSubject);
  }

  public Date getIssuedDate(String token) {
    return getClaimFromToken(token, Claims::getIssuedAt);
  }

  public Date getExpirationDate(String token) {
    return getClaimFromToken(token, Claims::getExpiration);
  }

  public boolean isTokenExpired(String token) {
    Date expiration = getExpirationDate(token);
    return expiration.before(new Date());
  }

  public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
    Claims claims = (Claims) extractBody(token);
    return claimsResolver.apply(claims);
  }

  public boolean validateToken(String token, AppUser userDetails) {
    String email = getUsername(token);
    return (email.equals(userDetails.getEmail()) && !isTokenExpired(token));
  }
}
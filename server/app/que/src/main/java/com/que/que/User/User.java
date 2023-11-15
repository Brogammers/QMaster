package com.que.que.User;

import java.security.spec.KeySpec;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Arrays;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public class User {

  private String name;
  private Date dateOfRegistration;
  private Date dateOfBirth;
  private String countryOfOrigin;
  private String username;
  private byte[] password;
  private byte[] email;

  public User(
      String name,
      Date dateOfRegistration,
      Date dateOfBirth,
      String countryOfOrigin,
      String password,
      String email,
      String username) {
    this.name = name;
    this.dateOfRegistration = dateOfRegistration;
    this.dateOfBirth = dateOfBirth;
    this.countryOfOrigin = countryOfOrigin;
    this.password = getSecureHash(password);
    this.email = getSecureHash(email);
    this.username = username;
  }

  private static byte[] getSecureHash(String s) {
    KeySpec spec = new PBEKeySpec(
        s.toCharArray(),
        Salts.getSaltByDay(LocalDate.now().getDayOfWeek().getValue() - 1),
        141551,
        265); // Gets hashing key using day of the week
    byte[] hash = null;
    try {
      SecretKeyFactory factory = SecretKeyFactory.getInstance(
          "PBKDF2WithHmacSHA1"); // Hashing algorithm
      hash = factory.generateSecret(spec).getEncoded();
      return hash; // Hash was successful
    } catch (Exception e) {
      return null;
    }
  }

  // Getters and Setters

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Date getDateOfRegistration() {
    return dateOfRegistration;
  }

  public void setDateOfRegistration(Date dateOfRegistration) {
    this.dateOfRegistration = dateOfRegistration;
  }

  public Date getDateOfBirth() {
    return dateOfBirth;
  }

  public String getUserPassword() {
    StringBuilder res = new StringBuilder();
    for (byte b : password) {
      res.append(b + ":");
    }
    return res.toString();
  }

  public String getUserUsername() {
    return this.username;
  }

  public void setDateOfBirth(Date dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  public String getCountryOfOrigin() {
    return countryOfOrigin;
  }

  public void setCountryOfOrigin(String countryOfOrigin) {
    this.countryOfOrigin = countryOfOrigin;
  }

  public void setPassword(String password) {
    this.password = getSecureHash(password);
  }

  public String getEmail() {
    StringBuilder res = new StringBuilder();
    for (byte b : email) {
      res.append(b + ":");
    }
    return res.toString();
  }

  public void setEmail(String email) {
    this.email = getSecureHash(email);
  }

  // Equals and Hashcode
  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((name == null) ? 0 : name.hashCode());
    result = prime * result + ((dateOfRegistration == null) ? 0 : dateOfRegistration.hashCode());
    result = prime * result + ((dateOfBirth == null) ? 0 : dateOfBirth.hashCode());
    result = prime * result + ((countryOfOrigin == null) ? 0 : countryOfOrigin.hashCode());
    result = prime * result + Arrays.hashCode(password);
    result = prime * result + Arrays.hashCode(email);
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    User other = (User) obj;
    if (name == null) {
      if (other.name != null)
        return false;
    } else if (!name.equals(other.name))
      return false;
    if (dateOfRegistration == null) {
      if (other.dateOfRegistration != null)
        return false;
    } else if (!dateOfRegistration.equals(other.dateOfRegistration))
      return false;
    if (dateOfBirth == null) {
      if (other.dateOfBirth != null)
        return false;
    } else if (!dateOfBirth.equals(other.dateOfBirth))
      return false;
    if (countryOfOrigin == null) {
      if (other.countryOfOrigin != null)
        return false;
    } else if (!countryOfOrigin.equals(other.countryOfOrigin))
      return false;
    if (!Arrays.equals(password, other.password))
      return false;
    if (!Arrays.equals(email, other.email))
      return false;
    return true;
  }
}
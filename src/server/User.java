import java.security.spec.KeySpec;
import java.sql.Date;
import java.time.LocalDate;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public class User {

  private String name;
  private Date dateOfRegistration;
  private Date dateOfBirth;
  private String countryOfOrigin;
  private byte[] password;
  private byte[] email;

  public User(
    String name,
    Date dateOfRegistration,
    Date dateOfBirth,
    String countryOfOrigin,
    String password,
    String email
  ) {
    this.name = name;
    this.dateOfRegistration = dateOfRegistration;
    this.dateOfBirth = dateOfBirth;
    this.countryOfOrigin = countryOfOrigin;
    this.password = getSecureHash(password);
    this.email = getSecureHash(email);
  }

  private static byte[] getSecureHash(String s) {
    KeySpec spec = new PBEKeySpec(
      s.toCharArray(),
      Salts.getSaltByDay(LocalDate.now().getDayOfWeek().getValue() - 1),
      141551,
      265
    ); // Gets hashing key using day of the week
    byte[] hash = null;
    try {
      SecretKeyFactory factory = SecretKeyFactory.getInstance(
        "PBKDF2WithHmacSHA1"
      ); // Hashing algorithm
      hash = factory.generateSecret(spec).getEncoded();
      return hash; // Hash was successful
    } catch (Exception e) {
      return null;
    }
  }

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

  public void setDateOfBirth(Date dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  public String getCountryOfOrigin() {
    return countryOfOrigin;
  }

  public void setCountryOfOrigin(String countryOfOrigin) {
    this.countryOfOrigin = countryOfOrigin;
  }

  public byte[] getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = getSecureHash(password);
  }

  public byte[] getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = getSecureHash(email);
  }
}

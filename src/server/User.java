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

  //testing, pls delete this
  //testing

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
}

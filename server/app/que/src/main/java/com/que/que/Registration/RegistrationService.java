package com.que.que.Registration;

import com.que.que.Registration.Token.ConfirmationToken;
import com.que.que.Registration.Token.ConfirmationTokenService;
import com.que.que.Security.PasswordValidator;
import com.que.que.User.SubscriptionPlans;
import com.que.que.User.AppUser.AppUser;
import com.que.que.User.AppUser.AppUserRole;
import com.que.que.User.AppUser.AppUserService;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class RegistrationService {

  private final AppUserService appUserService;
  private final BusinessUserService businessUserService;
  private final EmailValidator emailValidator;
  private final ConfirmationTokenService confirmationTokenService;
  private final PasswordValidator passwordValidator;
  // private final EmailSender emailSender;
  private final HashSet<String> phoneCodes;

  public String register(AppUserRegistrationRequest request) {
    boolean isValidEmail = emailValidator.test(request.getEmail());
    boolean isValidPassword = passwordValidator.test(request.getPassword());
    if (phoneCodes.isEmpty()) {
      renderCountryCodes();
    }
    if (!isValidPassword) {
      throw new IllegalStateException("Password does not meet requirements");
    }
    if (!isValidEmail) {
      throw new IllegalStateException("Email invalid");
    }
    if (!request.getPassword().equals(request.getConfirmPassword())) {
      throw new IllegalStateException("Password do not match");
    }
    /*
     * if (!phoneCodes.contains(request.getPhoneCode())) {
     * throw new IllegalStateException("Phone code not found");
     * }
     */
    String token = appUserService.signUpUser(
        new AppUser(
            AppUserRole.USER,
            request.getFirstName(),
            request.getLastName(),
            request.getUsername(),
            LocalDateTime.now(),
            request.getDateOfBirth(),
            request.getCountryOfOrigin(),
            request.getPassword(),
            request.getEmail(),
            false,
            false,
            "+20",
            "1202250070",
            "Egypt"));// request.getPhoneNumber(), request.getPhoneCode(),
    Map<String, String> context = new HashMap<>();
    context.put("name", request.getFirstName());
    context.put("token", token);
    // TODO: Activate later
    /*
     * emailSender.send(request.getEmail(),
     * "src/main/resources/templates/Activation.html",
     * "Confirm Email", context);
     */
    return token;
  }

  public String register(BusinessUserRegistrationRequest request) {
    boolean isValidEmail = emailValidator.test(request.getEmail());
    boolean isValidPassword = passwordValidator.test(request.getPassword());
    if (phoneCodes.isEmpty()) {
      renderCountryCodes();
    }
    if (!isValidPassword) {
      throw new IllegalStateException("Password does not meet requirements");
    }
    if (!isValidEmail) {
      throw new IllegalStateException("Email invalid");
    }
    if (!request.getPassword().equals(request.getConfirmPassword())) {
      throw new IllegalStateException("Password do not match");
    }
    /*
     * if (!phoneCodes.contains(request.getPhoneCode())) {
     * throw new IllegalStateException("Phone code not found");
     * }
     */
    String token = businessUserService.signUpUser(
        new BusinessUser(
            AppUserRole.USER,
            request.getFirstName(),
            request.getLastName(),
            request.getUsername(),
            LocalDateTime.now(),
            request.getDateOfBirth(),
            request.getCountryOfOrigin(),
            request.getPassword(),
            request.getEmail(),
            false,
            false,
            "+20",
            "1202250070",
            "Egypt", SubscriptionPlans.BASIC));// request.getPhoneNumber(), request.getPhoneCode(),
    Map<String, String> context = new HashMap<>();
    context.put("name", request.getFirstName());
    context.put("token", token);
    // TODO: Activate later
    /*
     * emailSender.send(request.getEmail(),
     * "src/main/resources/templates/Activation.html",
     * "Confirm Email", context);
     */
    return token;
  }

  @Transactional
  public void confirmToken(String token) {
    ConfirmationToken confirmationToken = confirmationTokenService.getToken(
        token);

    if (confirmationToken.getConfirmedAt() != null) {
      throw new IllegalStateException("Email already confirmed");
    }

    LocalDateTime expiredAt = confirmationToken.getExpiresAt();

    if (expiredAt.isBefore(LocalDateTime.now())) {
      throw new IllegalStateException("Token expired");
    }

    confirmationTokenService.setConfirmedAt(token);
    appUserService.enableAppUser(confirmationToken.getAppUser().getEmail());
  }

  public void renderCountryCodes() {
    // Add country phone number codes to the list
    phoneCodes.add("+93"); // Afghanistan
    phoneCodes.add("+355"); // Albania
    phoneCodes.add("+213"); // Algeria
    phoneCodes.add("+376"); // Andorra
    phoneCodes.add("+244"); // Angola
    phoneCodes.add("+1-268"); // Antigua and Barbuda
    phoneCodes.add("+54"); // Argentina
    phoneCodes.add("+374"); // Armenia
    phoneCodes.add("+61"); // Australia
    phoneCodes.add("+43"); // Austria
    phoneCodes.add("+994"); // Azerbaijan
    phoneCodes.add("+1-242"); // Bahamas
    phoneCodes.add("+973"); // Bahrain
    phoneCodes.add("+880"); // Bangladesh
    phoneCodes.add("+1-246"); // Barbados
    phoneCodes.add("+375"); // Belarus
    phoneCodes.add("+32"); // Belgium
    phoneCodes.add("+501"); // Belize
    phoneCodes.add("+229"); // Benin
    phoneCodes.add("+975"); // Bhutan
    phoneCodes.add("+591"); // Bolivia
    phoneCodes.add("+387"); // Bosnia and Herzegovina
    phoneCodes.add("+267"); // Botswana
    phoneCodes.add("+55"); // Brazil
    phoneCodes.add("+673"); // Brunei
    phoneCodes.add("+359"); // Bulgaria
    phoneCodes.add("+226"); // Burkina Faso
    phoneCodes.add("+257"); // Burundi
    phoneCodes.add("+855"); // Cambodia
    phoneCodes.add("+237"); // Cameroon
    phoneCodes.add("+1"); // Canada
    phoneCodes.add("+238"); // Cape Verde
    phoneCodes.add("+236"); // Central African Republic
    phoneCodes.add("+235"); // Chad
    phoneCodes.add("+56"); // Chile
    phoneCodes.add("+86"); // China
    phoneCodes.add("+57"); // Colombia
    phoneCodes.add("+269"); // Comoros
    phoneCodes.add("+243"); // Democratic Republic of the Congo
    phoneCodes.add("+242"); // Republic of the Congo
    phoneCodes.add("+506"); // Costa Rica
    phoneCodes.add("+385"); // Croatia
    phoneCodes.add("+53"); // Cuba
    phoneCodes.add("+357"); // Cyprus
    phoneCodes.add("+420"); // Czech Republic
    phoneCodes.add("+45"); // Denmark
    phoneCodes.add("+253"); // Djibouti
    phoneCodes.add("+1-767"); // Dominica
    phoneCodes.add("+1-809"); // Dominican Republic
    phoneCodes.add("+593"); // Ecuador
    phoneCodes.add("+20"); // Egypt
    phoneCodes.add("+503"); // El Salvador
    phoneCodes.add("+240"); // Equatorial Guinea
    phoneCodes.add("+291"); // Eritrea
    phoneCodes.add("+372"); // Estonia
    phoneCodes.add("+251"); // Ethiopia
    phoneCodes.add("+679"); // Fiji
    phoneCodes.add("+358"); // Finland
    phoneCodes.add("+33"); // France
    phoneCodes.add("+241"); // Gabon
    phoneCodes.add("+220"); // Gambia
    phoneCodes.add("+995"); // Georgia
    phoneCodes.add("+49"); // Germany
    phoneCodes.add("+233"); // Ghana
    phoneCodes.add("+30"); // Greece
    phoneCodes.add("+1-473"); // Grenada
    phoneCodes.add("+502"); // Guatemala
    phoneCodes.add("+224"); // Guinea
    phoneCodes.add("+245"); // Guinea-Bissau
    phoneCodes.add("+592"); // Guyana
    phoneCodes.add("+509"); // Haiti
    phoneCodes.add("+504"); // Honduras
    phoneCodes.add("+36"); // Hungary
    phoneCodes.add("+354"); // Iceland
    phoneCodes.add("+91"); // India
    phoneCodes.add("+62"); // Indonesia
    phoneCodes.add("+98"); // Iran
    phoneCodes.add("+964"); // Iraq
    phoneCodes.add("+353"); // Ireland
    phoneCodes.add("+972"); // Israel
    phoneCodes.add("+39"); // Italy
    phoneCodes.add("+1-876"); // Jamaica
    phoneCodes.add("+81"); // Japan
    phoneCodes.add("+962"); // Jordan
    phoneCodes.add("+7"); // Kazakhstan
    phoneCodes.add("+254"); // Kenya
    phoneCodes.add("+686"); // Kiribati
    phoneCodes.add("+965"); // Kuwait
    phoneCodes.add("+996"); // Kyrgyzstan
    phoneCodes.add("+856"); // Laos
    phoneCodes.add("+371"); // Latvia
    phoneCodes.add("+961"); // Lebanon
    phoneCodes.add("+266"); // Lesotho
    phoneCodes.add("+231"); // Liberia
    phoneCodes.add("+218"); // Libya
    phoneCodes.add("+423"); // Liechtenstein
    phoneCodes.add("+370"); // Lithuania
    phoneCodes.add("+352"); // Luxembourg
    phoneCodes.add("+389"); // Macedonia
    phoneCodes.add("+261"); // Madagascar
    phoneCodes.add("+265"); // Malawi
    phoneCodes.add("+60"); // Malaysia
    phoneCodes.add("+960"); // Maldives
    phoneCodes.add("+223"); // Mali
    phoneCodes.add("+356"); // Malta
    phoneCodes.add("+692"); // Marshall Islands
    phoneCodes.add("+222"); // Mauritania
    phoneCodes.add("+230"); // Mauritius
    phoneCodes.add("+52"); // Mexico
    phoneCodes.add("+691"); // Micronesia
    phoneCodes.add("+373"); // Moldova
    phoneCodes.add("+377"); // Monaco
    phoneCodes.add("+976"); // Mongolia
    phoneCodes.add("+382"); // Montenegro
    phoneCodes.add("+212"); // Morocco
    phoneCodes.add("+258"); // Mozambique
    phoneCodes.add("+95"); // Myanmar (Burma)
    phoneCodes.add("+264"); // Namibia
    phoneCodes.add("+674"); // Nauru
    phoneCodes.add("+977"); // Nepal
    phoneCodes.add("+31"); // Netherlands
    phoneCodes.add("+64"); // New Zealand
    phoneCodes.add("+505"); // Nicaragua
    phoneCodes.add("+227"); // Niger
    phoneCodes.add("+234"); // Nigeria
    phoneCodes.add("+47"); // Norway
    phoneCodes.add("+968"); // Oman
    phoneCodes.add("+92"); // Pakistan
    phoneCodes.add("+680"); // Palau
    phoneCodes.add("+507"); // Panama
    phoneCodes.add("+675"); // Papua New Guinea
    phoneCodes.add("+595"); // Paraguay
    phoneCodes.add("+51"); // Peru
    phoneCodes.add("+63"); // Philippines
    phoneCodes.add("+48"); // Poland
    phoneCodes.add("+351"); // Portugal
    phoneCodes.add("+974"); // Qatar
    phoneCodes.add("+40"); // Romania
    phoneCodes.add("+7"); // Russia
    phoneCodes.add("+250"); // Rwanda
    phoneCodes.add("+1-869"); // Saint Kitts and Nevis
    phoneCodes.add("+1-758"); // Saint Lucia
    phoneCodes.add("+1-784"); // Saint Vincent and the Grenadines
    phoneCodes.add("+685"); // Samoa
    phoneCodes.add("+378"); // San Marino
    phoneCodes.add("+239"); // Sao Tome and Principe
    phoneCodes.add("+966"); // Saudi Arabia
    phoneCodes.add("+221"); // Senegal
    phoneCodes.add("+381"); // Serbia
    phoneCodes.add("+248"); // Seychelles
    phoneCodes.add("+232"); // Sierra Leone
    phoneCodes.add("+65"); // Singapore
    phoneCodes.add("+421"); // Slovakia
    phoneCodes.add("+386"); // Slovenia
    phoneCodes.add("+677"); // Solomon Islands
    phoneCodes.add("+252"); // Somalia
    phoneCodes.add("+27"); // South Africa
    phoneCodes.add("+34"); // Spain
    phoneCodes.add("+94"); // Sri Lanka
    phoneCodes.add("+249"); // Sudan
    phoneCodes.add("+597"); // Suriname
    phoneCodes.add("+268"); // Swaziland
    phoneCodes.add("+46"); // Sweden
    phoneCodes.add("+41"); // Switzerland
    phoneCodes.add("+963"); // Syria
    phoneCodes.add("+886"); // Taiwan
    phoneCodes.add("+992"); // Tajikistan
    phoneCodes.add("+255"); // Tanzania
    phoneCodes.add("+66"); // Thailand
    phoneCodes.add("+228"); // Togo
    phoneCodes.add("+676"); // Tonga
    phoneCodes.add("+1-868"); // Trinidad and Tobago
    phoneCodes.add("+216"); // Tunisia
    phoneCodes.add("+90"); // Turkey
    phoneCodes.add("+993"); // Turkmenistan
    phoneCodes.add("+688"); // Tuvalu
    phoneCodes.add("+256"); // Uganda
    phoneCodes.add("+380"); // Ukraine
    phoneCodes.add("+971"); // United Arab Emirates
    phoneCodes.add("+44"); // United Kingdom
    phoneCodes.add("+1"); // United States
    phoneCodes.add("+598"); // Uruguay
    phoneCodes.add("+998"); // Uzbekistan
    phoneCodes.add("+678"); // Vanuatu
    phoneCodes.add("+58"); // Venezuela
    phoneCodes.add("+84"); // Vietnam
    phoneCodes.add("+967"); // Yemen
    phoneCodes.add("+260"); // Zambia
    phoneCodes.add("+263"); // Zimbabwe
  }
}

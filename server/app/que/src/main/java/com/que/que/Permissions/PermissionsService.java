package com.que.que.Permissions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.que.que.Location.Location;
import com.que.que.Partner.Partner;
import com.que.que.User.UserRole;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PermissionsService {

    private final BusinessUserRepository businessUserRepository;

    public Map<String, Object> getPermissionsOfBusinessUser(String email) {
        BusinessUser businessUser = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        UserRole userRole = businessUser.getUserRole();

        Map<String, Object> permissions = new HashMap<>();

        switch (userRole) {
            case BUSINESS_OWNER:
                permissions.put("permissions", BusinessUserPermissions.BUSINESS_OWNER_PERMISSIONS);
                break;
            case BUSINESS_ADMIN:
                permissions.put("permissions", BusinessUserPermissions.BUSINESS_ADMIN_PERMISSIONS);
                break;
            case BUSINESS_EMPLOYEE:
                permissions.put("permissions", BusinessUserPermissions.BUSINESS_EMPLOYEE_PERMISSIONS);
                break;
            case BUSINESS_MANAGER:
                permissions.put("permissions", BusinessUserPermissions.BUSINESS_ADMIN_PERMISSIONS);
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + userRole);
        }

        permissions.put("id", businessUser.getId());
        permissions.put("name", businessUser.getFirstName() + " " + businessUser.getLastName());

        Partner partner = businessUser.getPartner();
        List<Location> locations = partner.getLocations();
        List<Long> accessibleLocations = new ArrayList<>();

        for (Location location : locations) {
            accessibleLocations.add(location.getId());
        }
        permissions.put("branches", accessibleLocations);

        return permissions;
    }
}

package com.que.que.Permissions;

public abstract class BusinessUserPermissions {
        public static final String[] BUSINESS_OWNER_PERMISSIONS = { "view_store", "view_queues", "view_display",
                        "view_counter",
                        "view_sharing-info", "view_details", "view_customer-feedback" };
        public static final String[] BUSINESS_ADMIN_PERMISSIONS = { "view_store", "view_queues", "view_display",
                        "view_counter",
                        "view_sharing-info", "view_details", "view_customer-feedback" };
        public static final String[] BUSINESS_EMPLOYEE_PERMISSIONS = { "view_display", "view_counter",
                        "view_sharing-info" };
}
